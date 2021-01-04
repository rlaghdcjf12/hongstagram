from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import UserChangeForm, UserCreationForm
from .models import User

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ( 'username', 'nickName', 'email', 'introduce', 'is_admin')
    list_filter = ('is_admin','sex')
    fieldsets = (
        ('login info', {'fields': ( 'username', 'password',)}),
        ('Personal info', {'fields': ('profileImage','nickName','email','introduce','webSite','phoneNum','sex',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'nickName', 'email')}
         ),
    )
    search_fields = ('username', 'nickName', 'email')
    ordering = ('id',)
    filter_horizontal = ()

admin.site.register(User, UserAdmin)
admin.site.unregister(Group)