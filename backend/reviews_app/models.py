from django.db import models
from user_app.models import App_user
from django.utils import timezone
# Create your models here.

class Review(models.Model):
    user = models.ForeignKey(App_user, on_delete=models.CASCADE, related_name="reviews")
    game_id = models.IntegerField()
    review_text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)