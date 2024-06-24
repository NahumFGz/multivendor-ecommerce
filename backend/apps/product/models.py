from apps.core.models import TimeStampModel, TimeStampUUIDModel
from common.utils import generate_unique_slug
from django.db import models
from django.db.models import signals
from django.dispatch import receiver
from django.utils.text import slugify
from thumbnails.fields import ImageField
from tinymce import models as tinymce_models


class VendorType(TimeStampModel):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, blank=True, null=True, unique=True)

    class Meta:
        verbose_name = "Vendor Type"
        verbose_name_plural = "Vendor Types"

    def __str__(self):
        return f"{self.name}"


@receiver(signals.pre_save, sender=VendorType)
def pre_save_vendor_type(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = generate_unique_slug(
            instance=instance, source_field_name="name", destination_field_name="slug"
        )


class Category(TimeStampModel):
    name = models.CharField(max_length=200, unique=True)
    image = ImageField(upload_to="product/category/", blank=True, null=True)
    slug = models.SlugField(max_length=200, blank=True, null=True, unique=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.name}"

    @property
    def image_small_size(self):
        small_url = self.image.thumbnails.small.url
        return small_url

    @property
    def image_medium_size(self):
        medium_url = self.image.thumbnails.medium.url
        return medium_url

    @property
    def image_large_size(self):
        large_url = self.image.thumbnails.large.url
        return large_url


@receiver(signals.pre_save, sender=Category)
def pre_save_category(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = generate_unique_slug(
            instance=instance, source_field_name="name", destination_field_name="slug"
        )


class SubCategory(TimeStampModel):
    category = models.ForeignKey(
        Category, related_name="sub_category", blank=True, null=True, on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, blank=True, null=True, unique=True)
    principal_image = ImageField(upload_to="product/kind/", blank=True, null=True)

    class Meta:
        verbose_name = "Sub Category"
        verbose_name_plural = "Sub Categories"
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.name}"


@receiver(signals.pre_save, sender=SubCategory)
def pre_save_kind_product(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = generate_unique_slug(
            instance=instance, source_field_name="name", destination_field_name="slug"
        )


class Product(TimeStampUUIDModel):
    vendor_type = models.ForeignKey(
        VendorType,
        related_name="product_vendor_type",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )
    category = models.ForeignKey(
        Category, related_name="product_category", blank=True, null=True, on_delete=models.CASCADE
    )
    sub_category = models.ForeignKey(
        SubCategory,
        related_name="product_sub_category",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=400)
    slug = models.SlugField(max_length=400, blank=True, null=True, unique=True)
    short_description = tinymce_models.HTMLField(default="", blank=True, null=True)
    description = tinymce_models.HTMLField(default="", blank=True, null=True)
    views = models.IntegerField(default=0)
    rating = models.FloatField(default=0)
    image_principal = ImageField(upload_to="product/product/", blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    stock = models.IntegerField(default=0)
    is_presale = models.BooleanField(default=False)
    is_product_vendor = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return str(self.title)

    @property
    def image_small_size(self):
        small_url = self.image_principal.thumbnails.small.url
        return small_url

    @property
    def image_medium_size(self):
        medium_url = self.image_principal.thumbnails.medium.url
        return medium_url

    @property
    def image_large_size(self):
        large_url = self.image_principal.thumbnails.large.url
        return large_url


@receiver(signals.pre_save, sender=Product)
def pre_save_product(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = generate_unique_slug(
            instance=instance, source_field_name="title", destination_field_name="slug"
        )
