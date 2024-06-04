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
    class Meta:
        model = Product
        fields = "__all__"
