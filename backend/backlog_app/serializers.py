from rest_framework.serializers import ModelSerializer
from .models import Backlog

class BacklogSerializer(ModelSerializer):

    class Meta:
        model = Backlog
        fields = ['app_user', 'game']