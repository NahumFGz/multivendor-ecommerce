from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    FiltersProductViewSet,
    KindProductViewSet,
    ProductCUDView,
    ProductDetailView,
    ProductListView,
    SubKindProductViewSet,
)

urlpatterns = [
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<int:pk>/", ProductCUDView.as_view(), name="product-crud"),
    path("products/<slug:slug>/", ProductDetailView.as_view(), name="product-detail"),
    path("info/categories/", CategoryViewSet.as_view(), name="category-list"),
    path("info/kind-products/", KindProductViewSet.as_view(), name="kind-product-list"),
    path("info/sub-kind-products/", SubKindProductViewSet.as_view(), name="sub-kind-product-list"),
    path("info/all-filters/", FiltersProductViewSet.as_view(), name="all-filters-product-list"),
]
