from rest_framework import serializers
from .models import myInfo
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class MyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = myInfo
        fields = (
            "id", 
            "name", 
            "profileImage", 
            "nickName", 
            "webSite", 
            "introduce",
            "email",
            "phoneNum",
            "sex")