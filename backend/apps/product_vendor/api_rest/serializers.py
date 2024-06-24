from apps.product.api_rest.serializers import (
    TinyCategorySerializer,
    TinySubCategorySerializer,
)
from rest_framework import serializers

from ..models import ProductVendor, User


class TinyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name")


class ProductVendorSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    category = TinyCategorySerializer()
    sub_category = TinySubCategorySerializer()
    vendor = TinyUserSerializer()

    class Meta:
        model = ProductVendor
        fields = (
            "id",
            "vendor",
            "category",
            "sub_category",
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


class ProductVendorDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    category = TinyCategorySerializer()
    sub_category = TinySubCategorySerializer()
    vendor = TinyUserSerializer()

    class Meta:
        model = ProductVendor
        fields = (
            "id",
            "vendor",
            "category",
            "sub_category",
            "title",
            "short_description",
            "description",
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
