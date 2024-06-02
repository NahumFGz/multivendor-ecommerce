from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

from .views import CustomTokenObtainPairView, RegisterUserAPIView, UserApiViewSet

router = routers.DefaultRouter()
router.register(prefix="account", viewset=UserApiViewSet, basename="account")

urlpatterns = [
    path("", include(router.urls)),
    path("auth/register/", RegisterUserAPIView.as_view(), name="register"),
    path("auth/login-refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/login-access/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
]
