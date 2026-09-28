from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):

        print("COOKIES:", request.COOKIES)

        token = request.COOKIES.get("access")

        if not token:
            print("NO TOKEN")
            return None

        try:
            validated_token = self.get_validated_token(token)
            user = self.get_user(validated_token)

            print("AUTH USER:", user)
            print("AUTH ROLE:", user.role)

            return (user, validated_token)

        except Exception as e:
            print("ERROR:", repr(e))
            return None