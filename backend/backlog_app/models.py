from django.db import models
from user_app.models import App_user
# Create your models here.

class Backlog(models.Model):
    app_user = models.ForeignKey(App_user, on_delete=models.CASCADE, related_name="backlog")
    game = models.IntegerField()