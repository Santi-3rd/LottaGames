from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT
from .models import Collection
from .serializers import CollectionSerializer
import requests

class IGDB(APIView):
    def post(self, request):
        # Your IGDB Client ID and Client Secret
        client_id = "fsme0o5sq266rzvzxulos8kfnlf6dz"
        client_secret = "xqioimfxayvrqllvotxo7f3ifr7q31"
        id_Query = request.data.get("idQuery")
        game_status = request.data.get("gameStatus")
        
        # Obtain an access token from Twitch using OAuth2
        token_url = "https://id.twitch.tv/oauth2/token"
        token_payload = {
            "client_id": client_id,
            "client_secret": client_secret,
            "grant_type": "client_credentials"
        }
        token_response = requests.post(token_url, data=token_payload)
        token_data = token_response.json()
        
        if "access_token" not in token_data:
            return Response({"error": "Access token not obtained"}, status=500)
        
        access_token = token_data["access_token"]
        
        # Make a request to the IGDB API
        igdb_games_endpoint = "https://api.igdb.com/v4/games/"

        headers = {
            "Client-ID": client_id,
            "Authorization": f"Bearer {access_token}"
        }

        # Customize your query here
        game_query = f'fields name, cover.url; where id = {id_Query};'

        games_response = requests.post(igdb_games_endpoint, headers=headers, data=game_query)
        games_data = games_response.json() 

        response_data = {
            "games": games_data,
        }

        
        return Response(response_data, status=games_response.status_code)
    

class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Collection_Management(User_permissions):

    def post(self, request):
        request.data["app_user"] = request.user
        print(request.data)

        game_id = request.data.get("game_id")

        collection_game = Collection(app_user=request.user, game=game_id)
        collection_game.save()

        new_collection_game = CollectionSerializer(collection_game)
        
        return Response(new_collection_game.data, status=HTTP_201_CREATED)
    
    def get(self, request):
        collection_games = Collection.objects.filter(app_user=request.user)
        games_data = CollectionSerializer(collection_games, many=True).data
        return Response(games_data)
    
    def delete(self, request, game):

        a_collection_game = get_object_or_404(Collection, app_user=request.user, game=game)
        a_collection_game.delete()
        return Response(status=HTTP_204_NO_CONTENT)