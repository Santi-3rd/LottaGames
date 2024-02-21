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

  useEffect(() => {        
    const fetchData = async () => {
      try {
        //pings api for game info 
        const response = await api.post("v1/games/", { idQuery: gameId });
        setGames(response.data.games);

        const collection_response = await api.get("v1/collection/");
        const isGameInCollection = collection_response.data.some(item => parseInt(item.game) === parseInt(gameId));
        setIsGameInCollection(isGameInCollection);

        const review_response = await api.get("v1/reviews/");

        const isGameReviewed = review_response.data.some(item => parseInt(item.game_id) === parseInt(gameId));
        setIsGameReviewed(isGameReviewed)
        console.log(isGameReviewed)

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
    //Checks if the game is in the collection
    if (isGameInCollection) {
      await api.put(`v1/collection/update/${gameId}/`, { gameStatus: selectedStatus });
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
        <div className="mt-4 flex justify-center" >
        <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300" onClick={() => {
            handleSubmit()
            navigate(`/review/${gameId}`);
          }}>{isGameReviewed ? "Edit Review" : "Write Review"}</button>
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