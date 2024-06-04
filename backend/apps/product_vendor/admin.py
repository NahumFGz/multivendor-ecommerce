from django.contrib import admin

from .models import ProductVendor


@admin.register(ProductVendor)
class ProductVendorAdmin(admin.ModelAdmin):
    readonly_fields = [
        "image_small_size",
        "image_medium_size",
        "image_large_size",
        "created_at",
        "updated_at",
    ]
