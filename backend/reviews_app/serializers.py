from rest_framework.serializers import ModelSerializer
from .models import Review

class ReviewSerializer (ModelSerializer):

    class Meta:
        model = Review
        fields = ['id', 'game_id', 'user','review_text', 'created_at']