from django.contrib import admin

from .models import Category, KindProduct, Product, SubKindProduct


# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "updated_at"]
    readonly_fields = [
        "image_small_size",
        "image_medium_size",
        "image_large_size",
        "created_at",
        "updated_at",
    ]


@admin.register(KindProduct)
class KindProductAdmin(admin.ModelAdmin):
    list_display = ["category", "name", "slug", "updated_at"]
    readonly_fields = [
        "created_at",
        "updated_at",
    ]


@admin.register(SubKindProduct)
class SubKindProductAdmin(admin.ModelAdmin):
    list_display = ["name", "updated_at"]
    readonly_fields = [
        "created_at",
        "updated_at",
    ]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    search_fields = ["title", "slug"]
    list_display = [
        "category",
        "kind_of_product",
        "sub_kind_of_product",
        "title",
        "updated_at",
    ]
    readonly_fields = [
        "slug",
        "image_small_size",
        "image_medium_size",
        "image_large_size",
        "created_at",
        "updated_at",
    ]
