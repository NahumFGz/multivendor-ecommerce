# backend/apps/account/api_graphql/mutations.py

import graphene
from apps.account.api_graphql.types import UserType
from apps.account.models import User
from django.contrib.auth.hashers import make_password
from graphql_jwt.decorators import login_required
from graphql_jwt.shortcuts import create_refresh_token, get_token


class RegisterUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        first_name = graphene.String()
        last_name = graphene.String()

    @login_required
    def mutate(self, info, email, password, first_name=None, last_name=None):
        user = User(
            email=email,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save()
        return RegisterUser(user=user)


class UpdateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        id = graphene.ID(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        birth_date = graphene.Date()
        gender = graphene.String()
        document_type = graphene.String()
        document_number = graphene.String()
        phone_country_code = graphene.String()
        phone_number = graphene.String()

    @login_required
    def mutate(self, info, id, **kwargs):
        user = User.objects.get(pk=id)
        for key, value in kwargs.items():
            setattr(user, key, value)
        user.save()
        return UpdateUser(user=user)


class DeleteUser(graphene.Mutation):
    user_id = graphene.ID()

    class Arguments:
        id = graphene.ID(required=True)

    @login_required
    def mutate(self, info, id):
        user = User.objects.get(pk=id)
        user.delete()
        return DeleteUser(user_id=id)


class LoginUser(graphene.Mutation):
    token = graphene.String()
    refresh_token = graphene.String()

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, email, password):
        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                raise Exception("Invalid password!")
            return LoginUser(token=get_token(user), refresh_token=create_refresh_token(user))
        except User.DoesNotExist:
            raise Exception("Invalid login credentials!")
