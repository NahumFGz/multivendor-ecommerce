from datetime import timedelta

from apps.product.models import Product, VendorType
from common.utils import generate_unique_slug
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import signals
from django.dispatch import receiver
from django.utils import timezone
from django.utils.text import slugify

User = get_user_model()


DAYS_IN_PUBLICATION_CHOICES = [
    (30, "30"),
    (60, "60"),
]


class ProductVendor(Product):
    vendor = models.ForeignKey(User, related_name="products", on_delete=models.CASCADE)
    days_in_publication = models.IntegerField(choices=DAYS_IN_PUBLICATION_CHOICES, default=30)
    last_date_in_publication = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = "Product Vendor"
        verbose_name_plural = "Products Vendor"
        ordering = ["-updated_at"]

    def __str__(self):
        return self.vendor.email + " - " + self.title


@receiver(signals.pre_save, sender=ProductVendor)
def pre_save_product(sender, instance, **kwargs):
    instance.is_product_vendor = True
    if not instance.slug:
        instance.slug = generate_unique_slug(
            instance=instance, source_field_name="title", destination_field_name="slug"
        )


@receiver(signals.pre_save, sender=ProductVendor)
def pre_save_product_vendor(sender, instance, **kwargs):
    if instance.last_date_in_publication is None:
        instance.last_date_in_publication = timezone.now() + timedelta(
            days=instance.days_in_publication
        )

    if not instance.vendor_type:
        default_vendor_type, created = VendorType.objects.get_or_create(name="Otros")
        instance.vendor_type = default_vendor_type
