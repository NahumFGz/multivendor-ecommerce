# Generated by Django 4.2.13 on 2024-06-04 19:32

from django.db import migrations
import thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_alter_category_image_alter_product_image_principal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='image',
            field=thumbnails.fields.ImageField(blank=True, null=True, upload_to='product/category/'),
        ),
        migrations.AlterField(
            model_name='kindproduct',
            name='principal_image',
            field=thumbnails.fields.ImageField(blank=True, null=True, upload_to='product/kind/'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image_principal',
            field=thumbnails.fields.ImageField(blank=True, null=True, upload_to='product/product/'),
        ),
    ]