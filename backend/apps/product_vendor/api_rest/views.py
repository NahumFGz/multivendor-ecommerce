from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, mixins, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ..models import ProductVendor
from .serializers import ProductVendorDetailSerializer, ProductVendorSerializer


class ProductVendorListView(generics.ListAPIView):
    queryset = ProductVendor.objects.all()
    serializer_class = ProductVendorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    # Configurar los campos de búsqueda
    search_fields = ["title", "description"]

    # Configurar los campos de filtro
    filterset_fields = ["category", "price", "rating"]

    # Configurar los campos de ordenamiento y ordenamiento predeterminado
    ordering_fields = ["price", "rating", "created_at"]
    ordering = ["created_at"]


class ProductVendorDetailView(generics.RetrieveAPIView):
    """
    RetrieveAPIView es una clase de vista genérica que
    proporciona una interfaz de solo lectura para un recurso.
    """

    lookup_field = "slug"
    queryset = ProductVendor.objects.all()
    serializer_class = ProductVendorDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProductVendorCRUDView(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    queryset = ProductVendor.objects.all()
    serializer_class = ProductVendorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


# class ProductVendorViewSet(viewsets.ModelViewSet):
#     queryset = ProductVendor.objects.all()
#     serializer_class = ProductVendorSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     http_method_names = ["get", "post", "patch"]
#     lookup_field = "slug"

#     def get_object(self):
#         queryset = self.filter_queryset(self.get_queryset())
#         slug = self.kwargs.get(self.lookup_field)
#         try:
#             return queryset.get(slug=slug)
#         except ProductVendor.DoesNotExist:
#             raise NotFound(detail="ProductVendor not found.")
