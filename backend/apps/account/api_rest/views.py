from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from ..models import User
from .serializers import UserSerializer


class UserApiViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "post", "patch", "delete"]

    def destroy(self, request, *args, **kwargs):
        user = request.user
        if not user.is_superuser:
            raise PermissionDenied("You do not have permission to delete this user.")
        return super().destroy(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        user = request.user
        if not user.is_superuser:
            raise PermissionDenied("You do not have permission to create a user.")
        return super().create(request, *args, **kwargs)


class RegisterUserAPIView(APIView):
    serializer_class = UserSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
