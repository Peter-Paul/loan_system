from django.shortcuts import render
from django.contrib.auth import authenticate
from django.conf import settings

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes

from .models import Loan
from .serializers import LoanSerializer

from users.models import Member

def user_is_staff(request):
    user = request.user
    if user.is_staff:
        return True
    return False

@api_view(['GET','POST'])
def get_loans(request):
    if request.method == 'GET':
        loans = Loan.objects.all()
        serializer = LoanSerializer(loans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)  

    if request.method == 'POST':
        serializer = LoanSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return Response({
                'response':'Successfully created loan'
            },status=status.HTTP_201_CREATED)
        return Response({"err":serializer.errors},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PATCH','DELETE'])
def get_loan(request,pid):

    try:
        loan = Loan.objects.get(id=pid)
    except Loan.DoesNotExist:
        return Response({
            'response': 'Loan not found'
        },status=status.HTTP_404_NOT_FOUND)

    
    # if user_is_staff(request):
    #     print(request.data)

    if request.method == 'GET':
        serializer = LoanSerializer(loan, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PATCH':
        serializer = LoanSerializer(loan,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'response':'Successfully updated loan'
            },status=status.HTTP_200_OK)
        return Response({"err":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        operation = loan.delete()
        if operation:
            return Response({
                'response':'Successfully deleted loan'
            },status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # return Response({
    #         'response':"You don't have permission to access this data"
    #     },status=status.HTTP_401_UNAUTHORIZED)
    
