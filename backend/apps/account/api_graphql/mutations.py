# backend/apps/account/api_graphql/mutations.py

import graphene
from apps.account.models import User
from django.contrib.auth.hashers import make_password
from graphene_django.types import DjangoObjectType

from .types import UserType
from .validators import validate_password


class CreateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password1 = graphene.String(required=True)
        password2 = graphene.String(required=True)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)

    user = graphene.Field(UserType)

    def mutate(self, info, email, password1, password2, first_name=None, last_name=None):
        if password1 != password2:
            raise graphene.ValidationError("Passwords do not match.")
        validate_password(password1)
        user = User(email=email, first_name=first_name, last_name=last_name)
        user.password = make_password(password1)
        user.save()
        return CreateUser(user=user)


class UpdateUser(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        email = graphene.String(required=False)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)

    user = graphene.Field(UserType)

    def mutate(self, info, id, email=None, first_name=None, last_name=None):
        user = User.objects.get(pk=id)
        if email:
            user.email = email
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        user.save()
        return UpdateUser(user=user)


class ChangePassword(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        old_password = graphene.String(required=True)
        new_password1 = graphene.String(required=True)
        new_password2 = graphene.String(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, id, old_password, new_password1, new_password2):
        user = User.objects.get(pk=id)
        if not user.check_password(old_password):
            raise graphene.ValidationError("Old password is incorrect.")
        if new_password1 != new_password2:
            raise graphene.ValidationError("New passwords do not match.")
        validate_password(new_password1)
        user.password = make_password(new_password1)
        user.save()
        return ChangePassword(user=user)


class DeleteUser(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        user = User.objects.get(pk=id)
        user.delete()
        return DeleteUser(ok=True)
