from rest_framework import viewsets
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ..models import ProductVendor
from .serializers import ProductVendorSerializer


class ProductVendorViewSet(viewsets.ModelViewSet):
    queryset = ProductVendor.objects.all()
    serializer_class = ProductVendorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ["get", "post", "patch", "delete"]
    lookup_field = "slug"

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        slug = self.kwargs.get(self.lookup_field)
        try:
            return queryset.get(slug=slug)
        except ProductVendor.DoesNotExist:
            raise NotFound(detail="ProductVendor not found.")
