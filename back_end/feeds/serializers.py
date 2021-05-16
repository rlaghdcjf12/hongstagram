from rest_framework import serializers
from .models import Feeds
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feeds
        fields = ("id", "place", "image", "text", "owner", "created_at")