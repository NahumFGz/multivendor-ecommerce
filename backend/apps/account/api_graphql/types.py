# backend/apps/account/api_graphql/types.py

from apps.account.models import User
from graphene_django import DjangoObjectType


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "birth_date",
            "gender",
            "document_type",
            "document_number",
            "phone_country_code",
            "phone_number",
            "is_email_verified",
        )
