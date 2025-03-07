from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=15)
    country = models.CharField(max_length=100)
    total_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    income = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    outcome = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_deposits = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_profits = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    referrals = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

# Combined signal handler to create or save Profile
@receiver(post_save, sender=User)
def manage_profile(sender, instance, created, **kwargs):
    if created:
        # Create a Profile when a new User is created
        Profile.objects.create(user=instance)
    else:
        # Save the existing Profile if it exists, or create it if missing
        if not hasattr(instance, 'profile'):
            Profile.objects.create(user=instance)
        else:
            instance.profile.save()