from django.urls import path
from .views import Backlog_Management,IGDB

urlpatterns = [
    path('view/', IGDB.as_view(), name="igdb"),
    path('', Backlog_Management.as_view(), name='show_backlog'),
    path('add/', Backlog_Management.as_view(), name='add_to_backlog'),
    path('remove/<int:game>/', Backlog_Management.as_view(), name='remove_from_backlog'),
]