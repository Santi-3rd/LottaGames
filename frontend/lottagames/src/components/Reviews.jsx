import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utilities.jsx";
import { userContext } from "../App";

export const Reviews = () => {
  const { gameId } = useParams();
  const { user } = useContext(userContext);
  const [gameStatus, setGameStatus] = useState()
  const [reviews, setReviews] = useState([]);
 

  useEffect(() => {
  const fetchData = async () => {
    try {


      //Gets reviews and maps the username based on the user's id within the reviews db. Also, it gets the game's status from the collection
      const review_response = await api.get(`v1/reviews/${gameId}/`);
      
      const reviews = await Promise.all(review_response.data.map(async (review) => {
        const user_response = await api.get(`users/${review.user}`);
        const collection_response = await api.get("v1/collection/", {params: {
          user_id: review.user, 
          game_id: gameId
        }});
        return { ...review, userName: user_response.data.name, gameStatus: collection_response.data[0].game_status};
      }));
      setReviews(reviews);

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
                src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg" 
                alt="Profile Picture"
                className="w-7 h-7 rounded-full object-cover"
              />
              <h2 className="text-md font-semibold mb-2 ml-3 flex " >{review.userName}</h2>
            </div>
            <p>{review.gameStatus}</p> 
            <p className="text-xs flex ml-10">{review.review_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
