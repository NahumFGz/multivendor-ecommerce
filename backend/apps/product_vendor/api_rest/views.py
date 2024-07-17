from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, mixins, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ..models import ProductVendor
from .serializers import ProductVendorSerializer


class ProductVendorListView(viewsets.ModelViewSet):
    queryset = ProductVendor.objects.all()
    serializer_class = ProductVendorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    http_method_names = ["get", "post", "patch", "delete"]
    pagination_class = None

    # Configurar los campos de búsqueda
    search_fields = ["title", "description"]

    # Configurar los campos de filtro
    filterset_fields = ["category", "price", "rating"]

    # Configurar los campos de ordenamiento y ordenamiento predeterminado
    ordering_fields = ["price", "rating", "created_at"]
    ordering = ["created_at"]
