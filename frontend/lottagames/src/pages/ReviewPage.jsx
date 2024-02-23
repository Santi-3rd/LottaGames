import { useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import { api } from "../utilities.jsx"
import { userContext } from "../App";


export const Review = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const { gameId } = useParams();
  const [isGameReviewed, setIsGameReviewed] = useState(null);
  const [reviewId, setReviewId] = useState(null)
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {

        const review_response = await api.get("v1/reviews/");

        const isGameReviewed = review_response.data.some(item => parseInt(item.game_id) === parseInt(gameId));
        setIsGameReviewed(isGameReviewed)
        
        if (isGameReviewed) {
          const currentUserReview = review_response.data.find(item => parseInt(item.game_id) === parseInt(gameId) && item.user_id === user.id);
          
          //sets review text to text box and gets the id for handleRemove function
          if (currentUserReview) {
            setReviewId(currentUserReview.id)
            setReviewText(currentUserReview.review_text);
          }
        }


      } catch (error) {
        console.error(error);
      }
      } 
      fetchData();
    }, [])

  const handleSubmit = async () => {
      if (!isGameReviewed) { //Adds Review
        await api.post('v1/reviews/add/', {review_text: reviewText, game_id: gameId});
        console.log("added")
      }else{
        // Updates Review
        await api.put(`v1/reviews/update/${gameId}/`, { review_text: reviewText });
        setIsGameReviewed(isGameReviewed)
    }
  } 

  const handleRemove = async () => {
    try {
        await api.delete(`v1/reviews/remove/${reviewId}/`);
  
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2 flex justify-center">Write a Review</h2>
      <div className="mt-4 flex justify-center">
        <textarea
          className="w-full max-w-md px-3 py-2 border rounded text-black text-sm"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <div className="mt-4 flex justify-center">
          <button
          className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => {
            handleSubmit();
            navigate(`/games/${gameId}`);
          }}>Submit</button>
          {isGameReviewed && (
          <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => {
              handleRemove();
              navigate(`/games/${gameId}`);
            }}
          >
            Delete Review
              </button>)}
        </div>
      </div>
    </div>
  )
}
