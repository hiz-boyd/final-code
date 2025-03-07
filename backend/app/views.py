from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Profile
from .serializers import RegisterSerializer, LoginSerializer, DashboardSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
import logging


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
            serializer = DashboardSerializer(profile)
            return Response({
                "message": f"Welcome to the dashboard, {user.username}!",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({
                "message": "Profile not found",
                "data": {
                    "username": user.username,
                    "total_balance": "0.00",
                    "income": "0.00",
                    "outcome": "0.00",
                    "total_deposits": "0.00",
                    "total_profits": "0.00",
                    "referrals": 0,
                    "full_name": f"{user.first_name} {user.last_name}".strip() or user.username,
                }
            }, status=status.HTTP_200_OK)


class LogoutView(APIView):

    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can log out
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



logger = logging.getLogger(__name__)


class UserDataView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this endpoint

    def get(self, request):
        try:
            # Fetch the authenticated user
            user = request.user
            logger.info(f"Fetching data for user: {user.username}")

            # Fetch the user's profile
            profile = Profile.objects.get(user=user)
            logger.info(f"Profile found for user: {user.username}")

            # Prepare the response data
            data = {
                "total_balance": profile.total_balance,
                "income": profile.income,
                "outcome": profile.outcome,
                "total_deposits": profile.total_deposits,
                "total_profits": profile.total_profits,
                "referrals": profile.referrals,
                "full_name": f"{user.first_name} {user.last_name}".strip() or user.username,
            }

            logger.info(f"User data fetched successfully: {data}")
            return Response(data, status=status.HTTP_200_OK)

        except Profile.DoesNotExist:
            logger.error(f"Profile not found for user: {user.username}")
            return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error fetching user data: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)