from django.urls import include, path
from rest_framework import routers

from .views import RegisterUserAPIView, UserApiViewSet

router = routers.DefaultRouter()
router.register(prefix="user", viewset=UserApiViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
    path("user/register/", RegisterUserAPIView.as_view(), name="register"),
]
