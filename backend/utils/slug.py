from django.utils.text import slugify


def generate_unique_slug(instance, slug_field_name):
    slug = slugify(getattr(instance, "name"))
    model_class = instance.__class__
    unique_slug = slug
    extension = 1
    while model_class.objects.filter(**{slug_field_name: unique_slug}).exists():
        unique_slug = f"{slug}-{extension}"
        extension += 1
    return unique_slug
