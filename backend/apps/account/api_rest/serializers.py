import re

from decouple import config
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from ..models import User


def validate_password(password):
    # Custom password validations
    if len(password) < 8:
        raise serializers.ValidationError(
            {"password": "Password must be at least 8 characters long."}
        )
    if not re.search(r"[a-zA-Z]", password):
        raise serializers.ValidationError(
            {"password": "Password must contain at least one letter."}
        )
    if not re.search(r"[0-9]", password):
        raise serializers.ValidationError(
            {"password": "Password must contains at least one digit."}
        )
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        raise serializers.ValidationError(
            {"password": "Password must contain at least one special character."}
        )


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        permission_classes = []
        fields = (
            "id",
            "email",
            "profile_image",
            "first_name",
            "last_name",
            "birth_date",
            "gender",
            "document_type",
            "document_number",
            "phone_country_code",
            "phone_number",
            "is_email_verified",
            "password",
            "password2",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        validate_password(data["password"])
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        validated_data["password"] = make_password(validated_data["password"])
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if "password" in validated_data:
            validated_data.pop("password2", None)
            validated_data["password"] = make_password(validated_data["password"])
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def partial_update(self, instance, validated_data):
        if "password" in validated_data:
            validated_data.pop("password2", None)
            validated_data["password"] = make_password(validated_data["password"])
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "profile_image",
            "first_name",
            "last_name",
            "birth_date",
            "is_email_verified",
        )


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["session_id"] = user.session_id

        return token


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    new_password2 = serializers.CharField(write_only=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def validate(self, attrs):
        user = self.context["request"].user
        if not user.check_password(attrs["old_password"]):
            raise serializers.ValidationError({"old_password": "Old password is not correct."})
        if attrs["new_password"] != attrs["new_password2"]:
            raise serializers.ValidationError(
                {"new_password": "The two new password fields didn't match."}
            )
        return attrs

    def save(self, **kwargs):
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user


class LogoutAllDevicesSerializer(serializers.Serializer):
    def update_session_id(self, user):
        user.session_id += 1
        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user is associated with this email address.")
        return value

    def save(self):
        email = self.validated_data["email"]
        user = User.objects.get(email=email)
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Actualizar el token y la fecha de envío
        user.password_reset_token = token
        user.password_reset_sent_at = timezone.now()
        user.save()

        # Configurar tu dominio correctamente
        domain = config("HOST_DOMAIN")
        http_protocol = config("HTTP_HTTPS_PROTOCOL")
        link = f"{http_protocol}://{domain}/auth/password-reset-confirm/{uid}/{token}/"

        # Renderizar la plantilla HTML
        context = {
            "user": user,
            "link": link,
        }
        subject = config("EMAIL_SUBJECT")
        from_email = config("EMAIL_FROM")
        to_email = [email]
        text_content = f"Click the link to reset your password: {link}"
        html_content = render_to_string("password_reset_email.html", context)

        # Enviar el correo electrónico
        msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)


class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)
    uidb64 = serializers.CharField()
    token = serializers.CharField()

    def save(self):
        uidb64 = self.validated_data["uidb64"]
        token = self.validated_data["token"]
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError("Invalid UID")

        if user.password_reset_token != token:
            raise serializers.ValidationError("Invalid token")

        # Actualizar la contraseña y limpiar los campos de reseteo
        user.set_password(self.validated_data["new_password"])
        user.password_reset_token = None
        user.password_reset_sent_at = None
        user.session_id += 1
        user.save()

        return user
