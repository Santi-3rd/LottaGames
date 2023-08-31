from django.urls import path
from .views import Collection_Management,IGDB

urlpatterns = [
    path('view/', IGDB.as_view(), name="igdb"),
    path('', Collection_Management.as_view(), name='show_collection'),
    path('add/', Collection_Management.as_view(), name='add_to_collection'),
    path('remove/<int:game>/', Collection_Management.as_view(), name='remove_from_collection'),
]