import { useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import { api } from "../utilities.jsx"
import { userContext } from "../App";


export const Review = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [isGameReviewed, setIsGameReviewed] = useState(null);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {

        const review_response = await api.get("v1/reviews/");

        const isGameReviewed = review_response.data.some(item => parseInt(item.game_id) === parseInt(gameId));
        setIsGameReviewed(isGameReviewed)
        console.log(isGameReviewed)
      } catch (error) {
        console.error(error);
      }
      } 
      fetchData();
    })
    
  

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
          }}
        >
          Submit
          </button>
          </div>
      </div>
    </div>
  )
}
