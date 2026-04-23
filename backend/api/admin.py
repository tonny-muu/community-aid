from django.contrib import admin
from .models import User, Emergency, Donation, Notification


# =========================
# USER ACTIONS
# =========================
@admin.action(description="Activate selected users")
def activate_users(modeladmin, request, queryset):
    queryset.update(is_active=True)


@admin.action(description="Deactivate selected users")
def deactivate_users(modeladmin, request, queryset):
    queryset.update(is_active=False)


# =========================
# EMERGENCY ACTIONS
# =========================
@admin.action(description="Mark selected emergencies as RESOLVED")
def mark_resolved(modeladmin, request, queryset):
    queryset.update(status="resolved")


@admin.action(description="Mark selected emergencies as OPEN")
def mark_open(modeladmin, request, queryset):
    queryset.update(status="open")


# =========================
# DONATION ACTIONS
# =========================
@admin.action(description="Mark selected donations as APPROVED")
def approve_donations(modeladmin, request, queryset):
    queryset.update(status="approved")


@admin.action(description="Mark selected donations as REJECTED")
def reject_donations(modeladmin, request, queryset):
    queryset.update(status="rejected")


# =========================
# NOTIFICATION ACTIONS
# =========================
@admin.action(description="Mark selected notifications as READ")
def mark_as_read(modeladmin, request, queryset):
    queryset.update(read=True)


@admin.action(description="Mark selected notifications as UNREAD")
def mark_as_unread(modeladmin, request, queryset):
    queryset.update(read=False)


# =========================
# USER ADMIN
# =========================
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "role", "is_staff", "is_active")
    search_fields = ("email", "role")
    list_filter = ("role", "is_staff", "is_active")
    ordering = ("email",)
    actions = [activate_users, deactivate_users]


# =========================
# EMERGENCY ADMIN (FRONTEND ALIGNED)
# =========================
@admin.register(Emergency)
class EmergencyAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "emergencyType",   # ✅ FRONTEND STYLE
        "urgency",
        "status",
        "district",
        "created_at",
    )

    search_fields = ("title", "district", "emergencyType")
    list_filter = ("status", "urgency", "emergencyType", "district")
    ordering = ("-created_at",)
    date_hierarchy = "created_at"
    actions = [mark_resolved, mark_open]


# =========================
# DONATION ADMIN
# =========================
@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = (
        "donor",
        "emergency",
        "donation_type",
        "amount",
        "payment_method",
        "created_at",
    )

    search_fields = ("donor__email", "emergency__title", "donation_type")
    list_filter = ("donation_type", "payment_method")
    ordering = ("-created_at",)
    actions = [approve_donations, reject_donations]


# =========================
# NOTIFICATION ADMIN
# =========================
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("user", "message", "read", "created_at")
    search_fields = ("message", "user__email")
    list_filter = ("read",)
    ordering = ("-created_at",)
    actions = [mark_as_read, mark_as_unread]