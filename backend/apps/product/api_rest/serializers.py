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
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "category",
            "kind_of_product",
            "sub_kind_of_product",
            "title",
            "slug",
            "short_description",
            "description",
            "views",
            "rating",
            "images",
            "updated_at",
        )

    def get_images(self, obj):
        return {
            "principal": obj.image_principal.url if obj.image_principal else None,
            "small": obj.image_small_size if obj.image_principal else None,
            "medium": obj.image_medium_size if obj.image_principal else None,
            "large": obj.image_large_size if obj.image_principal else None,
        }
