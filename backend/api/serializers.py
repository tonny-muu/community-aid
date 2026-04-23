from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Emergency, Donation, Notification


# =========================
# USER SERIALIZER (PROFILE)
# =========================
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'role']


# =========================
# REGISTER SERIALIZER
# =========================
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'role']

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role']
        )


# =========================
# LOGIN SERIALIZER
# =========================
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data['email'],
            password=data['password']
        )

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        return {"user": user}


# =========================
# EMERGENCY SERIALIZER
# =========================
class EmergencySerializer(serializers.ModelSerializer):
    reported_by = UserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)

    class Meta:
        model = Emergency
        fields = '__all__'


# =========================
# DONATION SERIALIZER
# =========================
class DonationSerializer(serializers.ModelSerializer):
    donor = UserSerializer(read_only=True)
    emergency = EmergencySerializer(read_only=True)

    class Meta:
        model = Donation
        fields = '__all__'


# =========================
# NOTIFICATION SERIALIZER
# =========================
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'