from django.contrib import admin

from .models import ShippingInformation


@admin.register(ShippingInformation)
class ShippingInformationAdmin(admin.ModelAdmin):
    list_display = ["updated_at"]
    readonly_fields = [
        "created_at",
        "updated_at",
    ]
