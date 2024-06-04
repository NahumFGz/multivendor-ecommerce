from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ..models import Category, KindProduct, Product, SubKindProduct
from .serializers import (
    CategorySerializer,
    KindProductSerializer,
    ProductSerializer,
    SubKindProductSerializer,
)


class SubKindProductViewSet(viewsets.ModelViewSet):
    queryset = SubKindProduct.objects.all()
    serializer_class = SubKindProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ["get", "post", "patch", "delete"]


class KindProductViewSet(viewsets.ModelViewSet):
    queryset = KindProduct.objects.all()
    serializer_class = KindProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ["get", "post", "patch", "delete"]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ["get", "post", "patch", "delete"]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ["get", "post", "patch", "delete"]
