from django.db import models
from user_app.models import App_user
# Create your models here.

class Collection(models.Model):
    app_user = models.ForeignKey(App_user, on_delete=models.CASCADE, related_name="collection")
    game = models.IntegerField(primary_key=True)
    currently_playing = models.BooleanField(default=False)
    beaten = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    dropped = models.BooleanField(default=False)