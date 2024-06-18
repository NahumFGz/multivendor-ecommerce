from django.contrib import admin

from .models import ProductVendor


@admin.register(ProductVendor)
class ProductVendorAdmin(admin.ModelAdmin):
    search_fields = ["title", "slug"]
    list_display = ["title", "slug", "updated_at"]
    readonly_fields = [
        "slug",
        "last_date_in_publication",
        "image_small_size",
        "image_medium_size",
        "image_large_size",
        "created_at",
        "updated_at",
    ]
