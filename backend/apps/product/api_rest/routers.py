from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    KindProductViewSet,
    ProductCRUDView,
    ProductDetailView,
    ProductListView,
    SubKindProductViewSet,
)

router = DefaultRouter()
router.register(r"sub-kind-products", SubKindProductViewSet)
router.register(r"kind-products", KindProductViewSet)
router.register(r"categories", CategoryViewSet)
# router.register(r"products", ProductViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<int:pk>/", ProductCRUDView.as_view(), name="product-crud"),
    path("products/<slug:slug>/", ProductDetailView.as_view(), name="product-detail"),
]
