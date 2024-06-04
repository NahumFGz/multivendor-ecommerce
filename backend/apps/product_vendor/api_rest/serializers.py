from rest_framework import serializers

from ..models import ProductVendor


class ProductVendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVendor
        fields = "__all__"
