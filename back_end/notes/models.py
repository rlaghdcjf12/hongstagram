from django.db import models
from back_end.myUser.models import User

class Notes(models.Model):
    objects = models.Manager()
    text = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User, related_name="notes", on_delete=models.CASCADE, null=True
    )
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.text