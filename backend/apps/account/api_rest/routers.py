from django.urls import include, path
from rest_framework import routers

from .views import RegisterUserAPIView, UserApiViewSet

router = routers.DefaultRouter()
router.register(prefix="account", viewset=UserApiViewSet, basename="account")

urlpatterns = [
    path("", include(router.urls)),
    path("account/register/", RegisterUserAPIView.as_view(), name="register"),
]
