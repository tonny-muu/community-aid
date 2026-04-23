from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth import login

from .models import User, Emergency, Donation, Notification
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer,
    EmergencySerializer,
    DonationSerializer,
    NotificationSerializer
)


# =========================
# REGISTER
# =========================
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


# =========================
# LOGIN (SESSION - OPTIONAL)
# =========================
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        login(request, user)

        return Response({
            "user": UserSerializer(user).data,
            "message": "Login successful"
        })


# =========================
# PROFILE (DEV SAFE)
# =========================
class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        # DEV MODE: return first user instead of anonymous crash
        return User.objects.first()


# =========================
# EMERGENCIES (OPEN API)
# =========================
class EmergencyListCreateView(generics.ListCreateAPIView):
    queryset = Emergency.objects.all().order_by('-created_at')
    serializer_class = EmergencySerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # DEV MODE: assign first user as reporter (prevents crash)
        user = User.objects.first()
        serializer.save(reported_by=user)


class EmergencyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Emergency.objects.all()
    serializer_class = EmergencySerializer
    permission_classes = [permissions.AllowAny]


# =========================
# DONATIONS (OPEN API)
# =========================
class DonationListCreateView(generics.ListCreateAPIView):
    queryset = Donation.objects.all().order_by('-created_at')
    serializer_class = DonationSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = User.objects.first()
        serializer.save(donor=user)


class DonationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.AllowAny]


# =========================
# NOTIFICATIONS (OPEN API)
# =========================
class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Notification.objects.all().order_by('-created_at')


class MarkNotificationReadView(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Notification.objects.all()

    def patch(self, request, *args, **kwargs):
        notification = self.get_object()
        notification.read = True
        notification.save()
        return Response({"message": "Marked as read"})