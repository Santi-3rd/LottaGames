from django.db import models
from reviews_app.models import Review

# Create your models here.
class Game(models.Model):
    game_id = models.IntegerField(primary_key=True)
    reviews = models.ForeignKey(Review, on_delete=models.CASCADE, related_name="review", blank=True, null=True)