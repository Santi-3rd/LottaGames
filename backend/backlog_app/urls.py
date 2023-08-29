from django.urls import path
from .views import add_to_backlog

urlpatterns = [
    # ... other URL patterns
    path('', add_to_backlog, name='add_to_backlog'),
]