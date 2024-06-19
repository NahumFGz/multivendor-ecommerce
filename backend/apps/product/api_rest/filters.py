import django_filters

from ..models import Product


class NumberInFilter(django_filters.BaseInFilter, django_filters.NumberFilter):
    pass


class ProductFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    categories = NumberInFilter(field_name="category__id", lookup_expr="in")
    kind_of_product = NumberInFilter(field_name="kind_of_product__id", lookup_expr="in")
    sub_kind_of_product = NumberInFilter(field_name="sub_kind_of_product__id", lookup_expr="in")

    class Meta:
        model = Product
        fields = [
            "categories",
            "kind_of_product",
            "sub_kind_of_product",
            "price_min",
            "price_max",
            "rating",
        ]
