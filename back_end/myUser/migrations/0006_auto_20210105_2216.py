# Generated by Django 3.1.4 on 2021-01-05 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myUser', '0005_auto_20210105_2216'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='nickName',
            field=models.CharField(max_length=255, null=True),
        ),
    ]