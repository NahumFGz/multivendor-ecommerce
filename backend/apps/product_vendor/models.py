from datetime import timedelta

from apps.product.models import Product
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import signals
from django.dispatch import receiver
from django.utils import timezone
from django.utils.text import slugify
from utils.slug import generate_unique_slug

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


@receiver(signals.pre_save, sender=Product)
def pre_save_product(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = generate_unique_slug(instance, "slug")


@receiver(signals.pre_save, sender=ProductVendor)
def pre_save_product_vendor(sender, instance, **kwargs):
    if instance.last_date_in_publication is None:
        instance.last_date_in_publication = timezone.now() + timedelta(
            days=instance.days_in_publication
        )
