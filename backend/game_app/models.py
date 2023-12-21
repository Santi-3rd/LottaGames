from django.db import models
from reviews_app.models import Reviews

# Create your models here.
class Game(models.Model):
    game_id = models.IntegerField(primary_key=True)
    reviews = models.ForeignKey(Reviews, on_delete=models.CASCADE, related_name="reviews", blank=True, null=True)