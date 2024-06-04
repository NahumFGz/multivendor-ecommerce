from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    KindProductViewSet,
    ProductViewSet,
    SubKindProductViewSet,
)

router = DefaultRouter()
router.register(r"sub-kind-products", SubKindProductViewSet)
router.register(r"kind-products", KindProductViewSet)
router.register(r"categories", CategoryViewSet)
router.register(r"products", ProductViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
