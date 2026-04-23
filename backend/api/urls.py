from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    ProfileView,
    EmergencyListCreateView,
    EmergencyDetailView,
    DonationListCreateView,
    DonationDetailView,
    NotificationListView,
    MarkNotificationReadView
)

urlpatterns = [
    # AUTH
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),

    # PROFILE
    path("profile/", ProfileView.as_view()),

    # EMERGENCIES
    path("emergencies/", EmergencyListCreateView.as_view()),
    path("emergencies/<int:pk>/", EmergencyDetailView.as_view()),

    # DONATIONS
    path("donations/", DonationListCreateView.as_view()),
    path("donations/<int:pk>/", DonationDetailView.as_view()),

    # NOTIFICATIONS
    path("notifications/", NotificationListView.as_view()),
    path("notifications/<int:pk>/read/", MarkNotificationReadView.as_view()),
]