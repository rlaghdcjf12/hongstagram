from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, nickname, email, username, password=None):
        user = self.model(
            nickname=nickname,
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, nickname, username, email, password):
        user = self.create_user(
            nickname=nickname,
            username=username,
            email=email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    objects = UserManager()

    id = models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID')
    username = models.CharField(max_length=255, unique=True)
    nickname = models.CharField(max_length=255)
    webSite = models.CharField(max_length=255, null=True)
    phoneNum = models.CharField(max_length=255, null=True)
    sex = models.CharField(max_length=255, null=True)
    introduce = models.TextField(null=True)
    
    profileImage = models.ImageField(upload_to= "image/profile/%Y%M%D", null=True)
    email = models.EmailField(verbose_name='email',max_length=255,unique=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'nickname']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin