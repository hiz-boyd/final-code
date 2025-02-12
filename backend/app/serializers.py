from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db import IntegrityError, transaction
from rest_framework import serializers
from .models import Profile
from django.contrib.auth.password_validation import validate_password


class LoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username_or_email = data.get("username_or_email")
        password = data.get("password")

        # to check if user exists already
        user = User.objects.filter(email=username_or_email).first() or \
               User.objects.filter(username=username_or_email).first()

        if user and user.check_password(password):
            data["user"] = user
        else:
            raise serializers.ValidationError({"error": "Invalid Credentials"})
        return data
    




class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True)
    country = serializers.CharField(max_length=50)
    phone_number = serializers.CharField(max_length=15)
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'confirm_password',
            'country', 'phone_number', 'first_name', 'last_name'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"error": "Password and confirm password do not match."})
        return data

    def create(self, validated_data):
        phone_number = validated_data.pop('phone_number')
        country = validated_data.pop('country')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')

        try:
            with transaction.atomic():
                # Check if a user with the email or username exists
                if User.objects.filter(email=validated_data['email']).exists():
                    raise serializers.ValidationError({"error": "A user with this email already exists."})
                if User.objects.filter(username=validated_data['username']).exists():
                    raise serializers.ValidationError({"error": "A user with this username already exists."})

                # Check if the phone number is already used by another profile
                if Profile.objects.filter(phone_number=phone_number).exists():
                    raise serializers.ValidationError({"error": "A user with this phone number already exists."})

                # Create the User; the post_save signal will create a Profile automatically.
                user = User.objects.create_user(
                    username=validated_data['username'],
                    email=validated_data['email'],
                    password=validated_data['password'],
                    first_name=first_name,
                    last_name=last_name
                )

                # Now update the auto-created profile with the phone number and country.
                profile = user.profile  # Access the related profile via the related_name
                profile.phone_number = phone_number
                profile.country = country
                profile.save()

                return user

        except IntegrityError as e:
            if "UNIQUE constraint failed" in str(e):
                raise serializers.ValidationError({"error": "A user with this phone number already exists."})
            raise serializers.ValidationError({"error": f"There was an issue with profile creation: {str(e)}"})
        except serializers.ValidationError as e:
            raise e
        except Exception as e:
            raise serializers.ValidationError({"error": f"An unexpected error occurred: {str(e)}"})
