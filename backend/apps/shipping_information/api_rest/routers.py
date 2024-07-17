from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ShippingInformationViewSet

router = DefaultRouter()
router.register(r"shipping-information", ShippingInformationViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
