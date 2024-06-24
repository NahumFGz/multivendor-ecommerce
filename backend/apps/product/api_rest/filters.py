import django_filters

from ..models import Product


class NumberInFilter(django_filters.BaseInFilter, django_filters.NumberFilter):
    pass


class ProductFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    vendor_type = django_filters.NumberFilter(field_name="vendor_type__id")
    categories = NumberInFilter(field_name="category__id", lookup_expr="in")
    sub_categories = NumberInFilter(field_name="sub_category__id", lookup_expr="in")

    class Meta:
        model = Product
        fields = [
            "vendor_type",
            "categories",
            "sub_categories",
            "price_min",
            "price_max",
            "rating",
        ]
