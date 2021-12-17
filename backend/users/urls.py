from django.urls import path
from .views import create_user, login, fetch_user, users_list, change_password

urlpatterns = [
    path('register/', create_user, name='create'),
    path('login/', login, name='login'),
    path('list/', users_list, name='list'),
    path('<uid>/', fetch_user, name='getuser'),
    path('<uid>/changepassword/',change_password,name='changepassword')
]