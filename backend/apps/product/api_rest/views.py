from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, mixins, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from ..models import Category, KindProduct, Product, SubKindProduct
from .serializers import (
    CategorySerializer,
    KindProductSerializer,
    ProductDetailSerializer,
    ProductSerializer,
    SubKindProductSerializer,
)


class SubKindProductViewSet(generics.ListAPIView):
    queryset = SubKindProduct.objects.all()
    serializer_class = SubKindProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class KindProductViewSet(generics.ListAPIView):
    queryset = KindProduct.objects.all()
    serializer_class = KindProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoryViewSet(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    search_fields = ["title", "description"]
    filterset_fields = ["category", "price", "rating"]
    ordering_fields = ["price", "rating", "created_at"]
    ordering = ["created_at"]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(
                {"products": serializer.data, "count": queryset.count()}
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response({"products": serializer.data, "count": queryset.count()})


class ProductDetailView(generics.RetrieveAPIView):
    """
    RetrieveAPIView es una clase de vista genérica que
    proporciona una interfaz de solo lectura para un recurso.
    """

    lookup_field = "slug"
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProductCRUDView(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


# class ProductListView(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

#     # Configurar los campos de búsqueda
#     search_fields = ["title", "description"]

#     # Configurar los campos de filtro
#     filterset_fields = ["category", "price", "rating"]


#     # Configurar los campos de ordenamiento y ordenamiento predeterminado
#     ordering_fields = ["price", "rating", "created_at"]
#     ordering = ["created_at"]
