from apps.core.models import TimeStampModel, TimeStampUUIDModel
from django.db import models
from django.db.models import signals
from django.dispatch import receiver
from django.utils.text import slugify
from thumbnails.fields import ImageField
from tinymce import models as tinymce_models
from utils.slug import generate_unique_slug


class Category(TimeStampModel):
    name = models.CharField(max_length=200, unique=True)
    image = ImageField(upload_to="product/category/", blank=True, null=True)
    slug = models.SlugField(max_length=200, blank=True, null=True, unique=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

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
        instance.slug = generate_unique_slug(instance, "slug")


class KindProduct(TimeStampModel):
    category = models.ForeignKey(
        Category, related_name="kinds", blank=True, null=True, on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, blank=True, null=True, unique=True)
    principal_image = ImageField(upload_to="product/kind/", blank=True, null=True)

    class Meta:
        verbose_name = "Kind"
        verbose_name_plural = "Kinds"
        ordering = ["-updated_at"]

    def __str__(self):
        return self.name


@receiver(signals.pre_save, sender=KindProduct)
def pre_save_kind_product(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = generate_unique_slug(instance, "slug")


class SubKindProduct(TimeStampModel):
    kind = models.ForeignKey(
        KindProduct, related_name="subkinds", blank=True, null=True, on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, blank=True, null=True, unique=True)

    class Meta:
        verbose_name = "SubKind"
        verbose_name_plural = "SubKinds"

    def __str__(self):
        return self.name


@receiver(signals.pre_save, sender=SubKindProduct)
def pre_save_sub_kind_product(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = generate_unique_slug(instance, "slug")


class Product(TimeStampUUIDModel):
    category = models.ForeignKey(
        Category, related_name="product_category", blank=True, null=True, on_delete=models.CASCADE
    )
    kind_of_product = models.ForeignKey(
        KindProduct, related_name="product_kind", blank=True, null=True, on_delete=models.CASCADE
    )
    sub_kind_of_product = models.ForeignKey(
        SubKindProduct,
        related_name="product_subkind",
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
        instance.slug = generate_unique_slug(instance, "slug")
