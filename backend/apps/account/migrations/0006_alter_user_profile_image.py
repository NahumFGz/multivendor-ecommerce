# Generated by Django 4.2.13 on 2024-06-04 20:10

from django.db import migrations
import thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_remove_user_profile_picture_user_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=thumbnails.fields.ImageField(blank=True, null=True, upload_to='account/profile_image/'),
        ),
    ]
