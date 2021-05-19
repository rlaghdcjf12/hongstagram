from back_end.myUser.models import User
from back_end.myUser.serializers import MyInfoSerializer
from rest_framework import generics,viewsets, permissions
from rest_framework.response import Response
from .models import Feeds
from .serializers import FeedSerializer, AddSerializer

class FeedViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = FeedSerializer

    def get_queryset(self):
        return Feeds.objects.filter(owner=self.request.user).order_by("-created_at")

class FeedAddAPI(generics.CreateAPIView):
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AddSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            "feed": serializer.data
        })

class GetFeedOwnerAPI(generics.RetrieveAPIView):
    serializer_class = MyInfoSerializer

    def get(self, request, *args, **kwargs):
        flagId = kwargs['pk']
        feed = Feeds.objects.filter(id=flagId)
        owner = User.objects.filter(id=feed[0].owner_id)
        serializer = self.get_serializer(owner, many=True, context={"request": request})
        return Response({
            "owner": serializer.data
        })

