from rest_framework import serializers

from ..models import ProductVendor


class ProductVendorSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = ProductVendor
        fields = (
            "id",
            "vendor",
            "category",
            "kind_of_product",
            "sub_kind_of_product",
            "title",
            "slug",
            "price",
            "views",
            "rating",
            "days_in_publication",
            "updated_at",
            "last_date_in_publication",
            "images",
        )

    def get_images(self, obj):
        return {
            "principal": obj.image_principal.url if obj.image_principal else None,
            "small": obj.image_small_size if obj.image_principal else None,
            "medium": obj.image_medium_size if obj.image_principal else None,
            "large": obj.image_large_size if obj.image_principal else None,
        }
