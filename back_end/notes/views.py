from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from .models import Notes
from .serializers import NoteSerializer
from knox.models import AuthToken

class NoteViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Notes.objects.filter(owner=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class LoadMoreNotes(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = NoteSerializer

    def get(self, request, *args, **kwargs):
        flagId = kwargs['id']
        notes = Notes.objects.filter(owner=self.request.user).filter(id__lt=flagId).order_by('-created_at')[:10]
        isLast = False
        if len(notes) < 10:
            isLast = True
        serializer = self.get_serializer(notes, many=True, context={"request": request})
        return Response({
            "notes": serializer.data,
            "isLast": isLast
        })