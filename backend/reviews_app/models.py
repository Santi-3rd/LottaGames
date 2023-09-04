from django.db import models
from user_app.models import App_user
from collections_app.models import Collection
from django.utils import timezone
# Create your models here.

class Reviews(models.Model):
    app_user = models.ForeignKey(App_user, on_delete=models.CASCADE, related_name="reviews")
    game_id = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="reviews",blank=True, null=True)
    review_text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)