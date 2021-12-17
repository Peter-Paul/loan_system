from django.shortcuts import render
from django.contrib.auth import authenticate

from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import MemberSerializer, MemberGetSerializer, ChangePasswordSerializer
from .models import Member

# CREATES JWT TOKENS
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }



# USER REGISTRATION
def validate_email(email):
	account = None
	try:
		account = Member.objects.get(email=email)
	except Member.DoesNotExist:
		return None
	if account != None:
		return email

def validate_username(username):
	account = None
	try:
		account = Member.objects.get(username=username)
	except Member.DoesNotExist:
		return None
	if account != None:
		return username

@api_view(['POST'])
@authentication_classes([]) # Empty array because authentication and permission not needed
@permission_classes([]) # Empty array because authentication and permission not needed
def create_user(request):
    data = {}
    email = request.data.get('email', '0').lower()
    if validate_email(email) != None:
        data['error_message'] = 'That email is already in use.'
        data['response'] = 'Error'
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

    username = request.data.get('username', '0')
    if validate_username(username) != None:
        data['error_message'] = 'That username is already in use.'
        data['response'] = 'Error'
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
        
    serializer = MemberSerializer(data=request.data)
    if serializer.is_valid():
        account = serializer.save()
        data['response'] = 'successfully registered new user.'

        return Response(data,status=status.HTTP_201_CREATED)
    else:
        data['response'] = 'successfully registered new user.'
        data['error'] = serializer.errors
        return Response(data)



# USER LOGIN
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def login(request):
    data = {}
    username = request.data['username']
    password = request.data['password']
    account = authenticate(username=username, password=password)

    if account:
        if account.is_active:
            token = get_tokens_for_user(account)
            data['response'] = 'Sucessfully logged in'
            data['token'] = token

        else:
            data['response'] = 'error'
            data['message'] = 'Invalid Credentials'
    else:
        data['response'] = 'error'
        data['message'] = 'Invalid credentials or check your email to activate account'

    return Response(data)


# THE REST OF THE CRUD OPERATIONS
# GETS ALL MEMBERS 
@api_view(['GET']) # Has both authentication and permission by default
def users_list(request):
    users = Member.objects.all()
    serializer = MemberGetSerializer(users, many=True)
    return Response(serializer.data,status=status.HTTP_201_CREATED)

# PERFORMS CRUD OPERATIONS ON INDIVIDUAL USERS
@api_view(['GET','PATCH','DELETE'])
def fetch_user(request,uid):
    try:
        account = Member.objects.get(id=uid)
    except Member.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user = request.user

    if str(user) != account.email:
        return Response({
            'response': 'You do not have permission to access this'
        })

    if request.method == 'GET':
        serializer = MemberGetSerializer(account)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    if request.method == 'PATCH':
        serializer = MemberGetSerializer(account,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        operation = account.delete()
        data = {}
        if operation:
            data['response'] = 'Account deleted'
            return Response(data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

# CHANGE PASSWORD
@api_view(['PUT'])
def change_password(request,uid):
    try:
        account = Member.objects.get(id=uid)
    except Member.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user = request.user

    if str(user) != account.email:
        return Response({
            'response': 'You do not have permission to access this'
        })
    
    serializer = ChangePasswordSerializer(data=request.data, partial=True)
    data = {}
    if serializer.is_valid():
        # check old password
        if not account.check_password(serializer.data.get('old_password')):
            return Response(
                {"old_password": ["Wrong password."]},
                 status=status.HTTP_400_BAD_REQUEST
                 )
        # confirm new passwords match
        new_password = serializer.data.get("new_password")
        confirm_new_password = serializer.data.get("confirm_new_password")

        if new_password != confirm_new_password:
            return Response({"new_password": ["New passwords must match"]}, status=status.HTTP_400_BAD_REQUEST)

        account.set_password(new_password)
        account.save()
        return Response({"response":"successfully changed password"}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
