from django.urls import path
from .views import IGDB

urlpatterns = [
    path('', IGDB.as_view(), name="igdb"),
]