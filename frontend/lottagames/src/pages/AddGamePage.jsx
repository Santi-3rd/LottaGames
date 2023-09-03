import { useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import { api } from "../utilities.jsx"
import { userContext } from "../App";
import { Reviews } from "../components/Reviews.jsx";

export const AddGame = () => {
    const { gameId } = useParams();
    const { games, setGames } = useContext(userContext);
    const [isGameInBacklog, setIsGameInBacklog] = useState(null);
    const [isGameInCollection, setIsGameInCollection] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("currently_playing"); // State to track the selected status
    const navigate = useNavigate();

//pings api for all the game info the user needs
useEffect(() => {        
  const fetchData = async () => {

    try {
      const response = await api.post("v1/games/", { idQuery: gameId });
      setGames(response.data.games);

      const collection_response = await api.get("v1/collection/");
      console.log(collection_response.data)

      //checks if the gameId is within the collections's data
      const isGameInCollection = collection_response.data.some(item => parseInt(item.game) === parseInt(gameId));
      setIsGameInCollection(isGameInCollection);

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
            await api.post("v1/collection/add/", { game_id: gameId, gameStatus: selectedStatus});

            //Checks if the game is in the backlog
            const backlog_response = await api.get("v1/backlog/");
            const isGameInBacklog = backlog_response.data.some(item => parseInt(item.game) === parseInt(gameId));
            setIsGameInBacklog(isGameInBacklog);

            //Removes the game if it's in the backlog
            if (isGameInBacklog) {
              await api.delete(`v1/backlog/remove/${gameId}/`, { game_id: gameId });
              setIsGameInBacklog(!isGameInBacklog);
            }

            //Updates the game's status
            if (isGameInCollection) {
              await api.put(`v1/collection/update/${gameId}/`, { gameStatus: selectedStatus });
              setIsGameInBacklog(isGameInBacklog)
            }
      
          // Update the state after the action
          // setIsGameInCollection(!isGameInCollection);
      
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
        <h1>{games[0].name}</h1>

        <img src={games[0].cover?.url} alt={games.name}/>
        <select className="text-black"
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="currently_playing">Currently Playing</option>
            <option value="beaten">Beaten</option>
            <option value="completed">Completed</option>
            <option value="dropped">Dropped</option>
          </select>
        <Reviews/>
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
            onClick={handleRemove}
          >
            Remove
              </button>
    )}
  </div>
    )
}