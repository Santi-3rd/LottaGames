from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Backlog

@require_POST
def add_to_backlog(request):
    user = request.user  # Assuming you have authentication and user is available
    game_id = request.POST.get('game_id')

    # Create a new Backlog entry for the user and the selected game
    backlog_entry = Backlog.objects.create(app_user=user, game=game_id)

    return JsonResponse({'message': 'Game added to backlog successfully.'})