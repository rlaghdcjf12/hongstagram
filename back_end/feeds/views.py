from back_end import myUser
from rest_framework import serializers, generics,viewsets, permissions
from rest_framework.response import Response
from .models import Feeds
from .serializers import FeedSerializer
from ..myUser.models import User
from ..myUser.serializers import MyInfoSerializer
from knox.models import AuthToken

class FeedViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = FeedSerializer

    def get_queryset(self):
        # return Feeds.objects.filter(owner=self.request.user).order_by("-created_at")
        return Feeds.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save()

class ProfileFeedDetailViewSet(generics.RetrieveAPIView):
    serializer_class = MyInfoSerializer

    def get(self, request, *args, **kwargs):
        flagId = kwargs['pk']
        # notes = Feeds.objects.filter(owner=self.request.user).filter(id__lt=flagId).order_by('-created_at')[:10]
        feed = Feeds.objects.filter(id=flagId)
        owner = User.objects.filter(id=feed[0].owner_id)
        serializer = self.get_serializer(owner, many=True, context={"request": request})
        return Response({
            "owner": serializer.data
        })
        # return User.objects.filter(id=flagId)

