import { useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import { api } from "../utilities.jsx"
import { userContext } from "../App";

export const AddGame = () => {
    const { gameId } = useParams();
    const { user, games, setGames } = useContext(userContext);
    const [isGameInBacklog, setIsGameInBacklog] = useState(null);
    const [isGameInCollection, setIsGameInCollection] = useState(null);
    const [isGameReviewed, setIsGameReviewed] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("currently_playing"); // State to track the selected status
    const navigate = useNavigate();
    const [reviewText, setReviewText] = useState("");

//pings api for all the game info the user needs
  useEffect(() => {        
    const fetchData = async () => {
      try {
        const response = await api.post("v1/games/", { idQuery: gameId });
        setGames(response.data.games);

        const review_response = await api.get("v1/reviews/");

        const isGameReviewed = review_response.data.some(item => parseInt(item.game_id) === parseInt(gameId));
        setIsGameReviewed(isGameReviewed)

      } catch (error) {
        console.error(error);
      }
    };

  fetchData();
}, [gameId]);


const handleStatusChange = (status) => {
  setSelectedStatus(status);
};

const handleSubmit = async () => {
  try {
    const collection_response = await api.get("v1/collection/");
    const isGameInCollection = collection_response.data.some(item => parseInt(item.game) === parseInt(gameId));
    setIsGameInCollection(isGameInCollection);

    //Checks if the game is in the collection
    if (isGameInCollection) {
      await api.put(`v1/collection/update/${gameId}/`, { gameStatus: selectedStatus });
      setIsGameInBacklog(isGameInBacklog)
    } else{
      await api.post("v1/collection/add/", { game_id : gameId, gameStatus: selectedStatus});
    }

    //Checks if the game is in the backlog
    const backlog_response = await api.get("v1/backlog/");
    const isGameInBacklog = backlog_response.data.some(item => parseInt(item.game) === parseInt(gameId));
    setIsGameInBacklog(isGameInBacklog);

      //Removes the game if it's in the backlog
    if (isGameInBacklog) {
      await api.delete(`v1/backlog/remove/${gameId}/`, { game_id: gameId });
      setIsGameInBacklog(!isGameInBacklog);
    }

    //Updates the review
    if (!isGameReviewed) {
      await api.post('v1/reviews/add/', {review_text: reviewText, game_id: gameId});
    }else{
      // Get the current user's review for the game
      const review_response = await api.get(`v1/reviews/${gameId}/`);

      const userReview = review_response.data.find(item => item.user === 2);

      if (userReview) {
        await api.put(`v1/reviews/update/${gameId}/`, { review_text: reviewText });
        setIsGameReviewed(isGameReviewed)
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const handleRemove = async () => {
  try {
      await api.delete(`v1/collection/remove/${gameId}/`, { game_id: gameId });

    // Update the state after the action
    setIsGameInCollection(!isGameInCollection);

  } catch (error) {
    console.error(error);
  }

}


return (

    <div>
      <div className=" p-4 bg-slate-600 ">
        <h1 className=" flex justify-center text-2xl font-bold">{games[0].name}</h1>
        <div className="flex justify-center">
        <img src={games[0].cover.url.replace("/t_thumb/", "/t_cover_big/")} alt={games.name}/>
        </div>
        <div className="flex justify-center ">
          <select className="text-black  rounded mt-3"
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="currently_playing">Currently Playing</option>
            <option value="beaten">Beaten</option>
            <option value="completed">Completed</option>
            <option value="dropped">Dropped</option>
          </select>
          </div>
        </div>
        <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2 flex justify-center">Write a Review</h2>
      <div className="mt-4 flex justify-center">
        <textarea
          className="w-full max-w-md px-3 py-2 border rounded text-black text-sm"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
    </div>
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
            {isGameInCollection && (
              <button
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => {
              handleRemove();
              navigate(`/games/${gameId}`);
            }}
          >
            Delete Game
              </button>
      
          )}
        </div>
  </div>
    )
}