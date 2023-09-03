from django.db import models
from user_app.models import App_user

class Collection(models.Model):
    app_user = models.ForeignKey(App_user, on_delete=models.CASCADE, related_name="collection")
    game = models.IntegerField(primary_key=True, unique=True)
    game_status = models.CharField(default="currently_playing")