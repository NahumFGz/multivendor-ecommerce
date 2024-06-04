from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProductVendorViewSet

router = DefaultRouter()
router.register(r"product-vendors", ProductVendorViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
