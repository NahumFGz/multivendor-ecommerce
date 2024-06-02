import re

from django.contrib.auth.hashers import make_password
from rest_framework import serializers

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
