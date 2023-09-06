from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND
from .models import Reviews
from .serializers import ReviewSerializer


class Review_Management(APIView):
    
    def post(self, request):
        app_user = request.user.pk  # Get the user's primary key
        request.data["app_user"] = app_user
        game_id = request.data.get("game_id")
        print(game_id)
        review_text = request.data.get("review_text")

        serializer = ReviewSerializer(data=request.data)

        if serializer.is_valid():
            # If the data is valid, save the review
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        
    def get(self, request, game_id=None):
        if game_id is not None:
            # Retrieve all reviews for the specific game
            game_reviews = Reviews.objects.filter(game_id=game_id)
            review_data = ReviewSerializer(game_reviews, many=True).data
            return Response(review_data, status=HTTP_200_OK)
        else:
            # If no game_id is provided, return reviews for the authenticated user
            reviewed_games = Reviews.objects.filter(app_user=request.user)
            review_data = ReviewSerializer(reviewed_games, many=True).data
            return Response(review_data, status=HTTP_200_OK)


    def put(self, request, game_id):
        try:
            # Retrieve the existing record from the database
            review = Reviews.objects.get(game_id=game_id, app_user=request.user)

            # Update the review_text field
            review_text = request.data.get("review_text")
            review.review_text = review_text

            # Save the changes
            review.save()

            # Serialize and return the updated review
            updated_review = ReviewSerializer(review)
            return Response(updated_review.data, HTTP_200_OK)

        except Reviews.DoesNotExist:
            return Response({"detail": "Game not found"}, HTTP_404_NOT_FOUND)
        
    
    
    