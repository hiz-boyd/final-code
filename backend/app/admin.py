from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_balance', 'income', 'outcome', 'total_deposits', 'total_profits', 'referrals')
    list_editable = ('total_balance', 'income', 'outcome', 'total_deposits', 'total_profits', 'referrals')
    search_fields = ('user__username',)