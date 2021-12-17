from rest_framework import serializers
from .models import Member

class MemberSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Member
        fields = ['id', 'email', 'username', 'password', 'password2' ]
        extra_kwargs = {
				'password': {'write_only': True},
		}	

    def	save(self):

        member = Member(
            email=self.validated_data['email'],
            username=self.validated_data['username']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        member.set_password(password)
        member.save()
        return member

class MemberGetSerializer(serializers.ModelSerializer):  
      class Meta:
        model = Member
        fields = ['id','email','username','firstname','lastname','dob'
                    ,'mobile','nin','phaddress','poaddress','occupation','gnumber','is_staff']

class ChangePasswordSerializer(serializers.Serializer):

    old_password 				= serializers.CharField(required=True)
    new_password 				= serializers.CharField(required=True)
    confirm_new_password 		= serializers.CharField(required=True)

