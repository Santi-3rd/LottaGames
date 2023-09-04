from django.db import models

# Create your models here.
class Game(models.Model):
    game_id = models.IntegerField(primary_key=True)