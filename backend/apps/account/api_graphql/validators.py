# backend/apps/account/api_graphql/validators.py

import re

from graphene import String
from graphene_django import DjangoObjectType
from rest_framework import serializers


def validate_password(password):
    if len(password) < 8:
        raise serializers.ValidationError("Password must be at least 8 characters long.")
    if not re.search(r"[a-zA-Z]", password):
        raise serializers.ValidationError("Password must contain at least one letter.")
    if not re.search(r"[0-9]", password):
        raise serializers.ValidationError("Password must contains at least one digit.")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        raise serializers.ValidationError("Password must contain at least one special character.")
