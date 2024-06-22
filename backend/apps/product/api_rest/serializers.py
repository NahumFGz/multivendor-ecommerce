from rest_framework import serializers

from ..models import Category, KindProduct, Product, SubKindProduct


class FiltersProductSerializers(serializers.ModelSerializer):
    kind_id = serializers.IntegerField(source="kind.id")
    kind_name = serializers.CharField(source="kind.name")
    category_id = serializers.IntegerField(source="kind.category.id")
    category_name = serializers.CharField(source="kind.category.name")

    class Meta:
        model = SubKindProduct
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


# class SubKindProductSerializer(serializers.ModelSerializer):
#     kind = serializers.SerializerMethodField()

#     class Meta:
#         model = SubKindProduct
#         fields = '__all__'

#     def get_kind(self, obj):
#         return {
#             'id': obj.kind.id,
#             'name': obj.kind.name,
#             'slug': obj.kind.slug,
#             'principal_image': obj.kind.principal_image.url if obj.kind.principal_image else None,
#             'category': {
#                 'id': obj.kind.category.id,
#                 'name': obj.kind.category.name,
#                 'slug': obj.kind.category.slug,
#                 'created_at': obj.kind.category.created_at,
#                 'updated_at': obj.kind.category.updated_at,
#             }
#         }


# class FiltersProductSerializers(serializers.ModelSerializer):
#     kind_info = serializers.SerializerMethodField()

#     class Meta:
#         model = SubKindProduct
#         fields = ("kind_info",)

#     def get_kind_info(self, obj):
#         return {
#             "category_id": obj.kind.category.id,
#             "category_name": obj.kind.category.name,
#             "kind_id": obj.kind.id,
#             "kind_name": obj.kind.name,
#             "subkind_id": obj.id,
#             "subkind_name": obj.name,
#         }
