
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken


class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        response = Response({"message": "Logout Successful!"}, status=status.HTTP_200_OK)

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
            
        #Remove tokens from cookies
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        response.delete_cookie("sessionid")
        response.delete_cookie("csrftoken")

        return response

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)

            # Generate jwt tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Create response
            response = Response({
                "message": "Login Successful",
                "access_token": access_token,
                "refresh_token": str(refresh)
            }, status=status.HTTP_200_OK)

            # Set tokens in HTTP-only cookies
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,  # Make it HTTP-only to secure it
                secure=False,  # Set to True in production if using HTTPS
                samesite="Lax"
            )
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,  # Same as above
                secure=False,  # Set to True in production if using HTTPS
                samesite="Lax"
            )

            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh'
    ]

    return Response(routes)