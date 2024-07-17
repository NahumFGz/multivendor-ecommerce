from rest_framework import serializers

from ..models import ShippingInformation


class ShippingInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingInformation
        fields = "__all__"
