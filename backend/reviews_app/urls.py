from django.urls import path
from .views import Review_Management



urlpatterns = [
    path('', Review_Management.as_view(), name="get_reviews"),
    path('add/', Review_Management.as_view(), name="add_review"),
    path('update/<int:game_id>/', Review_Management.as_view(), name='update_review'),
]