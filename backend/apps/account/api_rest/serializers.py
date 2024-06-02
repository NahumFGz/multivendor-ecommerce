import re

from django.contrib.auth.hashers import make_password
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
            "first_name",
            "last_name",
            "gender",
            "birth_date",
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
