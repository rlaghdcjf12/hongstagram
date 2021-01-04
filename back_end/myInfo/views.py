from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Feeds
from .serializers import (
    MyInfoSerializer,
)
from knox.models import AuthToken

class MyInfoViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = MyInfoSerializer

    def get_queryset(self):
        return Feeds.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save()