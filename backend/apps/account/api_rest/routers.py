from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    CustomTokenObtainPairView,
    LogoutAllDevicesView,
    PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetView,
    RegisterUserAPIView,
    UserApiAuthMeView,
    UserApiViewSet,
)

router = routers.DefaultRouter()
router.register(prefix="account", viewset=UserApiViewSet, basename="account")

urlpatterns = [
    # Account API
    path("account/logout-all/", LogoutAllDevicesView.as_view(), name="logout_all"),
    path("account/change-password/", PasswordChangeView.as_view(), name="change_password"),
    path("", include(router.urls)),
    # Auth API
    path("auth/me/", UserApiAuthMeView.as_view(), name="auth_me"),
    path("auth/register/", RegisterUserAPIView.as_view(), name="register"),
    path("auth/login-refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/login-access/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/password-reset/", PasswordResetView.as_view(), name="password_reset"),
    path(
        "auth/password-reset-confirm/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
]
