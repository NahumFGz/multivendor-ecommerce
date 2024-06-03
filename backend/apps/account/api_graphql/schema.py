# backend/apps/account/api_graphql/schema.py

import graphene
from apps.account.api_graphql.mutations import (
    DeleteUser,
    LoginUser,
    RegisterUser,
    UpdateUser,
)
from apps.account.api_graphql.types import UserType


class Query(graphene.ObjectType):
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in!")
        return user


class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()
    login_user = LoginUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
