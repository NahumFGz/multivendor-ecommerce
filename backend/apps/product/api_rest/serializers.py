from rest_framework import serializers

from ..models import Category, KindProduct, Product, SubKindProduct


class SubKindProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubKindProduct
        fields = "__all__"


class KindProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = KindProduct
        fields = "__all__"


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


class TinySubKindProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubKindProduct
        fields = ("id", "name")


class TinyKindProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = KindProduct
        fields = ("id", "name")


class TinyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


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
    kind_of_product = TinyKindProductSerializer()
    sub_kind_of_product = TinySubKindProductSerializer()

    class Meta:
        model = Product
        fields = (
            "id",
            "category",
            "kind_of_product",
            "sub_kind_of_product",
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
