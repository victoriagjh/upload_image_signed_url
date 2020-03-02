from django.urls import path
from . import views
urlpatterns = [
    path('get_signed_url', views.get_signed_url, name='get_signed_url'),
]