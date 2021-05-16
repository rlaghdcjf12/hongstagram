from back_end import myUser
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Feeds
from ..myUser.models import User
from .serializers import (
    FeedSerializer,
)
from knox.models import AuthToken

class FeedViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = FeedSerializer

    def get_queryset(self):
        # return Feeds.objects.filter(owner=self.request.user).order_by("-created_at")
        return Feeds.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save()

class ProfileFeedDetailViewSet(viewsets.ModelViewSet):
    serializer_class = FeedSerializer

    def get(self, request, **kwargs):
        flagId = kwargs['id']
        # notes = Feeds.objects.filter(owner=self.request.user).filter(id__lt=flagId).order_by('-created_at')[:10]
        feed = Feeds.objects.filter(id__lt=flagId)
        # owner = User.objects.filter(id = feed.owner_id)
        serializer = self.get_serializer(feed, context={"request": request})
        return Response({
            "feed": serializer.data,
        })

