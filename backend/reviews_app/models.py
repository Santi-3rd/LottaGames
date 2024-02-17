from django.db import models
from user_app.models import App_user
from django.utils import timezone
from collections_app.models import Collection
# Create your models here.

class Review(models.Model):
    user = models.ForeignKey(App_user, on_delete=models.CASCADE, related_name="reviews")
    game_id = models.IntegerField()
    game_status = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="reviews")
    review_text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)