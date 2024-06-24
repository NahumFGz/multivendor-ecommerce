from common.pagination import CustomPageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, mixins, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from ..models import Category, Product, SubCategory, VendorType
from .filters import ProductFilter
from .serializers import (
    CategorySerializer,
    ProductCUDSerializer,
    ProductDetailSerializer,
    ProductListSerializer,
    SubCategorySerializer,
    VendorTypeSerializer,
)


class VendorTypeViewSet(generics.ListAPIView):
    queryset = VendorType.objects.all()
    serializer_class = VendorTypeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None


class SubCategoryProductViewSet(generics.ListAPIView):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None


class CategoryViewSet(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer  # Usar el nuevo serializador
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    pagination_class = CustomPageNumberPagination  # Usar la clase de paginación personalizada

    # Configurar los campos de búsqueda
    search_fields = ["title", "description"]

    # Configurar los campos de filtro
    filterset_class = ProductFilter  # Usar el filtro personalizado

    # Configurar los campos de ordenamiento y ordenamiento predeterminado
    ordering_fields = ["title", "price", "rating", "updated_at"]
    ordering = ["updated_at"]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # Paginación
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            product_data = self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)
            product_data = Response(serializer.data)

        response_data = {
            "products": product_data.data,
        }

        return Response(response_data)


class ProductDetailView(generics.RetrieveAPIView):
    """
    RetrieveAPIView es una clase de vista genérica que
    proporciona una interfaz de solo lectura para un recurso.
    """

    lookup_field = "slug"
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProductCUDView(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    queryset = Product.objects.all()
    serializer_class = ProductCUDSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
