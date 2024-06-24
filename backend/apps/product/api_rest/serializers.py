from rest_framework import serializers

from ..models import Category, Product, SubCategory


class FiltersProductSerializers(serializers.ModelSerializer):
    kind_id = serializers.IntegerField(source="kind.id")
    kind_name = serializers.CharField(source="kind.name")
    category_id = serializers.IntegerField(source="kind.category.id")
    category_name = serializers.CharField(source="kind.category.name")

    class Meta:
        model = SubCategory
        fields = ("kind_id", "kind_name", "id", "name", "category_id", "category_name")

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            "category_id": representation["category_id"],
            "category_name": representation["category_name"],
            "kind_id": representation["kind_id"],
            "kind_name": representation["kind_name"],
            "subkind_id": representation["id"],
            "subkind_name": representation["name"],
        }


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
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


class TinySubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
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
