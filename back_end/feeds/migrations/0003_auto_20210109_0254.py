# Generated by Django 3.1.4 on 2021-01-08 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feeds', '0002_remove_feeds_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feeds',
            name='image',
            field=models.ImageField(upload_to='front_end/public/image/feeds/'),
        ),
    ]
