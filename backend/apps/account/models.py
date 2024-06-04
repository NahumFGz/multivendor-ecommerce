from apps.account.managers import UserManager
from apps.core.models import TimeStampModel
from django.contrib.auth.models import AbstractUser
from django.db import models
from thumbnails.fields import ImageField


class User(AbstractUser, TimeStampModel):
    GENDER_CHOICES = [
        ("M", "Male"),
        ("F", "Female"),
        ("O", "Other"),
    ]

    DOC_CHOISES = [
        ("PA", "Pasaporte"),
        ("DNI", "Documento nacional de identidad"),
        ("CE", "Carnet de extranjería"),
    ]

    username = None
    email = models.EmailField(unique=True)
    profile_image = ImageField(upload_to="account/profile_image/", blank=True, null=True)

    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=255, choices=GENDER_CHOICES, blank=True, null=True)
    document_type = models.CharField(max_length=255, choices=DOC_CHOISES, blank=True, null=True)
    document_number = models.CharField(max_length=255, blank=True, null=True)
    phone_country_code = models.CharField(max_length=10, null=True, blank=True)
    phone_number = models.CharField(max_length=255, null=True, blank=True)

    password_reset_token = models.CharField(max_length=255, blank=True, null=True)
    password_reset_sent_at = models.DateTimeField(blank=True, null=True)
    session_id = models.IntegerField(default=0)
    is_email_verified = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def profile_image_tiny_size(self):
        tiny_url = self.profile_image.thumbnails.tiny.url
        return tiny_url
