from django.urls import path
from .views import get_loans,get_loan

urlpatterns = [
    path('loan-list/',get_loans,name='loan-list'),
    path('loan/<pid>/',get_loan),

]