from django.db import models
from django.conf import settings


class Loan(models.Model):
    lamount 			= models.CharField(max_length=50, null=False, blank=True)
    interest 			= models.CharField(max_length=50, null=False, blank=True)
    security     		= models.TextField(max_length=5000, null=False, blank=True)
    installments 		= models.CharField(max_length=50, null=False, blank=True)
    irate 				= models.CharField(max_length=50, null=True, blank=True)
    active				= models.BooleanField(default=False)
    adate 				= models.CharField(max_length=50, null=True, blank=True)
    edate 				= models.CharField(max_length=50, null=True, blank=True)
    duration 			= models.CharField(max_length=50, null=True, blank=True)
    paid 				= models.CharField(max_length=50, null=True, blank=True)
    date_published 		= models.DateTimeField(auto_now_add=True, verbose_name="date published")
    date_updated 		= models.DateTimeField(auto_now=True, verbose_name="date updated")
    user 				= models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.user