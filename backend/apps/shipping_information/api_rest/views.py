from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import ShippingInformation
from .serializers import ShippingInformationSerializer


class ShippingInformationViewSet(viewsets.ModelViewSet):
    queryset = ShippingInformation.objects.all()
    serializer_class = ShippingInformationSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "patch", "delete"]
    pagination_class = None
