from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Feeds
from .serializers import (
    FeedSerializer,
)
from knox.models import AuthToken

class FeedViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = FeedSerializer

    def get_queryset(self):
        return Feeds.objects.filter(owner=self.request.user).order_by("-created_at")
        # return Feeds.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save()