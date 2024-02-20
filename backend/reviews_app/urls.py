from django.urls import path
from .views import Review_Management



urlpatterns = [
    path('<int:game_id>/', Review_Management.as_view(), name="get_all_reviews_of_game"),
    path('', Review_Management.as_view(), name="get_reviews"),
    path('add/', Review_Management.as_view(), name='add_review'),
    path('remove/<int:review_id>/', Review_Management.as_view(), name='remove_review'),
    path('update/<int:game_id>/', Review_Management.as_view(), name='update_review'),
]