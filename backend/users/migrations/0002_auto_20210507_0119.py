# Generated by Django 3.1.6 on 2021-05-07 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
