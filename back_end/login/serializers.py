from rest_framework import serializers
from .models import userInfo

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = userInfo
        fields = ("login_id","login_pw","user_name","birth_date")
