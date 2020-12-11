from django.db import models

# Create your models here.
class userInfo(models.Model):
    objects = models.Manager()
    login_id = models.CharField(max_length=25)
    login_pw = models.CharField(max_length=20)
    user_name = models.CharField(max_length=50)
    birth_date = models.DateTimeField('date published')

    def __str__(self):
        return self.user_name

