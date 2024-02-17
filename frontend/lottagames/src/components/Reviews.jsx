import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utilities.jsx";
import { userContext } from "../App";

export const Reviews = () => {
  const { gameId } = useParams();
  const [gameStatus, setGameStatus] = useState()
  const [reviews, setReviews] = useState([]);
 

  useEffect(() => {
  const fetchData = async () => {
    try {
      const review_response = await api.get(`v1/reviews/${gameId}/`);
      setReviews(review_response.data);

      const updatedReviews = [];

      for (const review of review_response.data) {
        const username_response = await api.get(`users/${review.user}/`);
        const collection_response = await api.get(`v1/collection/?user_id=${review.user}&game_id=${gameId}`);

        const userName = username_response.data.name;
        const gameStatus = collection_response.data.game_status;

        updatedReviews.push({
          ...review,
          user: userName,
          game_status: gameStatus,
        });
      }

      console.log(updatedReviews)

      setReviews(updatedReviews);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [gameId]);

  

  return (
    <div className="mt-4 mx-auto max-w-md"> {/* Center the content and limit width */}
      <h2 className="text-xl font-semibold mb-2 text-center">Reviews</h2>
      <div className="mt-4 text-center">
        {reviews.map((review, index) => (
          <div className="text-center m-2 rounded-lg border bg-slate-600 border-gray-300 p-4" key={index}>
            <div className="flex-shrink-0 mr-3 flex ">
              <img 
                src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg" // Replace with the URL to the user's profile picture
                alt="Profile Picture"
                className="w-7 h-7 rounded-full object-cover"
              />
              <h2 className="text-md font-semibold mb-2 ml-3 flex ">{review.user}</h2>
            </div>
            <p>{review.game_status}</p> 
            <p className="text-xs flex ml-10">{review.review_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
