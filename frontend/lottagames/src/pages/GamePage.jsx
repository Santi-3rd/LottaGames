import { useParams,} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import { api } from "../utilities.jsx"
import { userContext } from "../App";
import { Reviews } from "../components/Reviews.jsx";



export const Games = () => {
  const { gameId } = useParams();
  const { games, setGames } = useContext(userContext);
  const [isAddingToBacklog, setIsAddingToBacklog] = useState(false); // State to manage button state

  console.log(gameId)
  
  //pings api for all the game info you need
  useEffect(() => {        
    const fetchData = async () => {

      try {
        const response = await api.post("v1/games/", { idQuery: gameId });
        console.log(response.data);
        setGames(response.data.games);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [gameId]);

  const game = games[0];


// Function to handle adding a game to the backlog
const addToBacklog = async () => {
  setIsAddingToBacklog(true); // Set loading state while the request is made

  try {
    const response = await api.post("v1/add_to_backlog/", { game_id: gameId });
    console.log(response.data);

    // Handle the response if needed

    setIsAddingToBacklog(false); // Reset loading state
  } catch (error) {
    console.error(error);
    setIsAddingToBacklog(false); // Reset loading state on error
  }
};




return (
  <div>
  {game && (
    <div>
      <h1>{game.name}</h1>
      <img src={game.cover?.url} alt={game.name} />
      <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300">Add to Collection</button>
      <button
            className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300"
            onClick={addToBacklog}
            disabled={isAddingToBacklog}
          >
            {isAddingToBacklog ? "Adding to Backlog..." : "Add to Backlog"}
          </button>
      <p>{game.summary}</p>
      <p>{game.storyline}</p>
    </div>
  )}
</div>
);
};
