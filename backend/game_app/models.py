from django.db import models
from .views import IGDB

# Create your models here.
class Game(models.Model):
    game_id = models.IntegerField(primary_key=True)
    want_to_play = models.BooleanField(default=False)
    playing = models.BooleanField(default=False)
    beaten = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    dropped = models.BooleanField(default=False)