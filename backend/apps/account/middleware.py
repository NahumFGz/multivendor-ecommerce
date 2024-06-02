# users/middleware.py

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin


class JWTTokenValidateMiddleware(MiddlewareMixin):

    def process_request(self, request):
        auth_header = request.headers.get("Authorization", None)
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            try:
                # Decodificar el token sin validarlo
                decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                # print("Token decodificado:", decoded_token)

                # Obtener el session_id del token
                token_session_id = decoded_token.get("session_id")
                user_id = decoded_token.get("user_id")

                if token_session_id is not None and user_id is not None:
                    # Obtener el usuario de la base de datos
                    User = get_user_model()
                    user = User.objects.get(id=user_id)

                    # Comparar session_id del token con el session_id del usuario
                    print(f"session_id del token: {token_session_id}")
                    print(f"session_id del usuario: {user.session_id}")

                    if token_session_id != user.session_id:
                        print(
                            f"Advertencia: El session_id del token ({token_session_id}) es diferente al session_id del usuario ({user.session_id})"
                        )
                        return JsonResponse({"detail": "Token inválido por session_id"}, status=401)
                    else:
                        print("El session_id del token coincide con el session_id del usuario")
                        pass

            except jwt.ExpiredSignatureError:
                print("El token ha expirado")
                return JsonResponse({"detail": "El token ha expirado"}, status=401)
            except jwt.DecodeError:
                print("Error al decodificar el token")
                return JsonResponse({"detail": "Error al decodificar el token"}, status=401)
            except User.DoesNotExist:
                print("El usuario no existe")
                return JsonResponse({"detail": "El usuario no existe"}, status=401)
            except Exception as e:
                print(f"Error inesperado al decodificar el token: {e}")
                return JsonResponse(
                    {"detail": "Error inesperado al decodificar el token"}, status=401
                )
        return None
