from apps.core.models import TimeStampModel
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class ShippingInformation(TimeStampModel):
    user = models.ForeignKey(User, related_name="shipping_info", on_delete=models.CASCADE)
    email = models.CharField(max_length=200, blank=True, null=True)
    first_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    address = models.CharField(max_length=500, blank=True, null=True)
    address_number = models.CharField(max_length=100, blank=True, null=True)
    reference = models.CharField(max_length=1000, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = "Shipping Information"
        verbose_name_plural = "Shipping Information"
        ordering = ["-updated_at"]

    def __str__(self):
        return self.user.email
