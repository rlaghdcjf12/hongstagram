# Generated by Django 3.1.4 on 2021-01-04 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myUser', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
