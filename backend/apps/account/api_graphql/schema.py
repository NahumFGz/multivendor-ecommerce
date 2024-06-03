# backend/apps/account/api_graphql/schema.py

import graphene
from apps.account.models import User
from graphene_django.types import DjangoObjectType

from .mutations import ChangePassword, CreateUser, DeleteUser, UpdateUser


class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    user = graphene.Field(UserType, id=graphene.Int())

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()

    def resolve_user(self, info, id):
        return User.objects.get(pk=id)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()
    change_password = ChangePassword.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
