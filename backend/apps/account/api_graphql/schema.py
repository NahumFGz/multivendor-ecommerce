# backend/apps/account/api_graphql/schema.py

import graphene
import graphql_jwt
from apps.account.api_graphql.mutations import (
    DeleteUser,
    LoginUser,
    RegisterUser,
    UpdateUser,
)
from apps.account.api_graphql.types import UserType
from graphql_jwt.decorators import login_required


class Query(graphene.ObjectType):
    me = graphene.Field(UserType)

    @login_required
    def resolve_me(self, info):
        return info.context.user


class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
