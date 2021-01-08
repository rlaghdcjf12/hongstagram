from django.db import models
from django.contrib.auth.models import User


class Feeds(models.Model):
    objects = models.Manager()
    place = models.CharField(max_length=255)

    image = models.ImageField(upload_to="front_end/public/image/feeds/")
    text = models.CharField(max_length=255)
    # owner = models.ForeignKey(
    #     User, related_name="feeds", on_delete=models.CASCADE, null=True
    # )
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.text