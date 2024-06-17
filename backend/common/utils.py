from django.utils.text import slugify


def generate_unique_slug(*, instance, source_field_name, destination_field_name):
    source_value = slugify(getattr(instance, source_field_name))
    model_class = instance.__class__
    unique_slug = source_value
    extension = 1
    while model_class.objects.filter(**{destination_field_name: unique_slug}).exists():
        unique_slug = f"{source_value}-{extension}"
        extension += 1
    return unique_slug
