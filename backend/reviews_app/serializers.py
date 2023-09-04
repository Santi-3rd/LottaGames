from rest_framework.serializers import ModelSerializer
from .models import Reviews

class ReviewSerializer (ModelSerializer):

    class Meta:
        model = Reviews
        fields = ['id', 'app_user','game_id','review_text']