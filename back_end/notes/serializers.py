from rest_framework import serializers
from .models import Notes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ("id", "text")