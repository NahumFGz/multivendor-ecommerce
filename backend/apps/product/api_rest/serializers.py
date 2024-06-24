from rest_framework import serializers

from ..models import Category, Product, SubCategory, VendorType


class TinyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


class TinySubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ("id", "name")


class VendorTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorType
        fields = ("id", "name")


class CategorySerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ("id", "name", "slug", "images", "updated_at")

    def get_images(self, obj):
        return {
            "principal": obj.image.url if obj.image else None,
            "small": obj.image_small_size if obj.image else None,
            "medium": obj.image_medium_size if obj.image else None,
            "large": obj.image_large_size if obj.image else None,
        }


class SubCategorySerializer(serializers.ModelSerializer):
    category = TinyCategorySerializer()

    class Meta:
        model = SubCategory
        fields = ("id", "name", "category")

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            "category_id": instance.category.id,
            "category_name": instance.category.name,
            "sub_category_id": representation["id"],
            "sub_category_name": representation["name"],
        }


class ProductListSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "slug",
            "views",
            "rating",
            "images",
            "updated_at",
            "price",
            "stock",
            "is_presale",
            "is_product_vendor",
        )

    def get_images(self, obj):
        return {
            "principal": obj.image_principal.url if obj.image_principal else None,
            "small": obj.image_small_size if obj.image_principal else None,
            "medium": obj.image_medium_size if obj.image_principal else None,
            "large": obj.image_large_size if obj.image_principal else None,
        }


class ProductDetailSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    category = TinyCategorySerializer()
    sub_category = TinySubCategorySerializer()

    class Meta:
        model = Product
        fields = (
            "id",
            "category",
            "sub_category",
            "title",
            "short_description",
            "description",
            "slug",
            "views",
            "rating",
            "images",
            "updated_at",
            "price",
            "stock",
            "is_presale",
        )

    def get_images(self, obj):
        return {
            "principal": obj.image_principal.url if obj.image_principal else None,
            "small": obj.image_small_size if obj.image_principal else None,
            "medium": obj.image_medium_size if obj.image_principal else None,
            "large": obj.image_large_size if obj.image_principal else None,
        }


class ProductCUDSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"
