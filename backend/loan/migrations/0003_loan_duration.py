# Generated by Django 3.1.6 on 2021-05-09 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loan', '0002_loan_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='loan',
            name='duration',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]