import { useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import { api } from "../utilities.jsx"
import { userContext } from "../App";
import { Reviews } from "../components/Reviews.jsx";



export const Games = () => {
  const { gameId } = useParams();
  const { games, setGames } = useContext(userContext);
  const [isGameInBacklog, setIsGameInBacklog] = useState(null);
  const navigate = useNavigate();

  console.log(gameId)
  
  //pings api for all the game info the user needs
  useEffect(() => {        
    const fetchData = async () => {

      try {
        const response = await api.post("v1/games/", { idQuery: gameId });
        setGames(response.data.games);

        //ping api for games within the backlog
        const backlog_response = await api.get("v1/backlog/");
        console.log(backlog_response.data)

        //checks if the gameId is within the data
        const isGameInBacklog = backlog_response.data.some(item => parseInt(item.game) === parseInt(gameId));
        setIsGameInBacklog(isGameInBacklog);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [gameId]);

  const game = games[0];


// Function to handle adding or removing a game from the backlog
const handleBacklog = async () => {
  try {
    if (isGameInBacklog) {
      await api.delete(`v1/backlog/remove/${gameId}/`, { game_id: gameId });
    } else {
      await api.post("v1/backlog/add/", { game_id: gameId });
    }

    // Update the state after the action
    setIsGameInBacklog(!isGameInBacklog);

    
  } catch (error) {
    console.error(error);
  }
};



return (
  <div>
  {game && (
    <div>
      <h1>{game.name}</h1>
      <img src={game.cover?.url} alt={game.name} />
      <button onClick={() => navigate(`/addgame/${gameId}`)} className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300">Add to Collection</button>
      <button
            className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleBacklog}>
            {isGameInBacklog ? "Remove from Backlog" : "Add to Backlog"}
          </button>
      <p>{game.summary}</p>
      <p>{game.storyline}</p>
    </div>
  )}
</div>
);
};
