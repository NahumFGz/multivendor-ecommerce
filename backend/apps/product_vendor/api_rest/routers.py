from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProductVendorListView

router = DefaultRouter()
router.register(r"product-vendors", ProductVendorListView)

urlpatterns = [
    path("", include(router.urls)),
    # path("product-vendors/", ProductVendorListView.as_view(), name="product-vendor-list"),
    # path("product-vendors/<int:pk>/", ProductVendorCRUDView.as_view(), name="product-vendor-crud"),
    # path(
    #     "product-vendors/<slug:slug>/",
    #     ProductVendorDetailView.as_view(),
    #     name="product-vendor-detail",
    # ),
]
