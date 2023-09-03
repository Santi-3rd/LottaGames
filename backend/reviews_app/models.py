from django.db import models
from user_app.models import App_user
# from game_app.models import Game
# Create your models here.

class Reviews(models.Model):
    app_user = models.ForeignKey(App_user, on_delete=models.CASCADE, related_name="reviews")
    # game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="reviews")
    review = models.CharField()