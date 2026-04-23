from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


# =========================
# USER MANAGER
# =========================
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, role="donor", **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        extra_fields.setdefault("role", role)
        extra_fields.setdefault("is_active", True)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("role", "admin")

        return self.create_user(email=email, password=password, **extra_fields)


# =========================
# USER MODEL
# =========================
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('donor', 'Donor'),
        ('volunteer', 'Volunteer'),
    )

    username = None
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="donor")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


# =========================
# EMERGENCY MODEL (FRONTEND-ALIGNED)
# =========================
class Emergency(models.Model):
    TYPE_CHOICES = [
        ('Medical', 'Medical'),
        ('Fire', 'Fire'),
        ('Accident', 'Accident'),
        ('Food', 'Food'),
        ('Shelter', 'Shelter'),
        ('Other', 'Other'),
    ]

    URGENCY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
        ('Critical', 'Critical'),
    ]

    STATUS_CHOICES = [
        ('open', 'Open'),
        ('assigned', 'Assigned'),
        ('resolved', 'Resolved'),
    ]

    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)

    title = models.CharField(max_length=255)
    description = models.TextField()

    emergencyType = models.CharField(max_length=20, choices=TYPE_CHOICES)
    urgency = models.CharField(max_length=20, choices=URGENCY_CHOICES)

    district = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()

    goal = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    file = models.FileField(upload_to='emergencies/', null=True, blank=True)

    reported_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reported_emergencies"
    )

    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_emergencies"
    )

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# =========================
# DONATION MODEL (PAYMENT READY)
# =========================
class Donation(models.Model):
    DONATION_TYPES = [
        ('money', 'Money'),
        ('food', 'Food'),
        ('clothes', 'Clothes'),
        ('medical', 'Medical'),
        ('other', 'Other'),
    ]

    PAYMENT_METHODS = [
        ('Credit Card', 'Credit Card'),
        ('PayPal', 'PayPal'),
        ('Mobile Money', 'Mobile Money'),
    ]

    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="donations")
    emergency = models.ForeignKey(Emergency, on_delete=models.CASCADE, related_name="donations")

    donation_type = models.CharField(max_length=20, choices=DONATION_TYPES)

    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    item_name = models.CharField(max_length=255, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)

    payment_method = models.CharField(
        max_length=50,
        choices=PAYMENT_METHODS,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.donor.email} → {self.emergency.title}"


# =========================
# NOTIFICATION MODEL
# =========================
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")

    message = models.CharField(max_length=255)
    read = models.BooleanField(default=False)

    emergency = models.ForeignKey(
        Emergency,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message