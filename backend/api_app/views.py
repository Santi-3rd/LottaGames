from rest_framework.views import APIView
from rest_framework.response import Response
import requests

class IGDB(APIView):
    def post(self, request):
        # Your IGDB Client ID and Client Secret
        client_id = "fsme0o5sq266rzvzxulos8kfnlf6dz"
        client_secret = "xqioimfxayvrqllvotxo7f3ifr7q31"
        search_query = request.data.get("searchQuery")
        
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
        
        # Make a requests to the IGDB API
        igdb_games_endpoint = "https://api.igdb.com/v4/games/"

        headers = {
            "Client-ID": client_id,
            "Authorization": f"Bearer {access_token}"
        }

        # Customize your query here
        game_query = f'fields name, cover.url; search "{search_query}"; limit 50;'
        games_response = requests.post(igdb_games_endpoint, headers=headers, data=game_query)
        games_data = games_response.json() 

        response_data = {
            "games": games_data,
        }

        
        return Response(response_data, status=games_response.status_code)