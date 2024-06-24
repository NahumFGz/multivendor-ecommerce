from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    ProductCUDView,
    ProductDetailView,
    ProductListView,
    SubCategoryProductViewSet,
    VendorTypeViewSet,
)

urlpatterns = [
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<int:pk>/", ProductCUDView.as_view(), name="product-crud"),
    path("products/<slug:slug>/", ProductDetailView.as_view(), name="product-detail"),
    path("info/vendor-types/", VendorTypeViewSet.as_view(), name="vendor-type-list"),
    path("info/categories/", CategoryViewSet.as_view(), name="category-list"),
    path("info/sub-categories/", SubCategoryProductViewSet.as_view(), name="sub-categories-list"),
]
