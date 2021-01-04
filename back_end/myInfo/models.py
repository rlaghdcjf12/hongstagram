from django.db import models
from django.contrib.auth.models import User


class MyInfo(models.Model):
    objects = models.Manager()
    name = models.CharField(max_length=255, primary_key=True)
    profileImage = models.ImageField(upload_to= "/image/profile/" + name, null=True)
    nickName = models.CharField(max_length=255, null=True)
    webSite = models.CharField(max_length=255, null=True)
    introduce = models.TextField(null=True)
    email = models.EmailField(max_length=255, primary_key=True)
    phoneNum = models.CharField(max_length=255, null=True)
    sex = models.CharField(max_length=255, null=True)
    owner = models.ForeignKey(
        User, related_name="myInfo", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.text