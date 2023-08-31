from rest_framework.serializers import ModelSerializer
from .models import Collection

class CollectionSerializer(ModelSerializer):

    class Meta:
        model = Collection
        fields = ['app_user', 'game','currently_playing','beaten ','completed','dropped']