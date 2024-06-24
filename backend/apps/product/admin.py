from django.contrib import admin

from .models import Category, Product, SubCategory


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


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "slug", "updated_at"]
    readonly_fields = [
        "created_at",
        "updated_at",
    ]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    search_fields = ["title", "slug"]
    list_display = [
        "category",
        "sub_category",
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
