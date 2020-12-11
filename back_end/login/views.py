from rest_framework import viewsets
from .serializers import LoginSerializer
from .models import userInfo

# Create your views here.

class LoginViewSet(viewsets.ModelViewSet):
    serializer_class = LoginSerializer

    def get_queryset(self):
        return userInfo.objects.all().order_by("birth_date")

    def perform_create(self, serializer):
        serializer.save()