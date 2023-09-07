import { useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import { api } from "../utilities.jsx"
import { userContext } from "../App";
import { Reviews } from "../components/Reviews.jsx";



export const Games = () => {
  const { gameId } = useParams();
  const { games, setGames } = useContext(userContext);
  const [isGameInBacklog, setIsGameInBacklog] = useState(null);
  const [isGameinCollection, setIsGameInCollection] = useState(null)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  //pings api for all the game info the user needs
  useEffect(() => {        
    const fetchData = async () => {

      try {
        const response = await api.post("v1/games/", { idQuery: gameId });
        setGames(response.data.games);

        //ping api for games within the backlog and collection
        const backlog_response = await api.get("v1/backlog/");
        const collection_response = await api.get("v1/collection/");

        //checks if the gameId is within the backlog's data
        const isGameInBacklog = backlog_response.data.some(item => parseInt(item.game) === parseInt(gameId));
        setIsGameInBacklog(isGameInBacklog);
        

        //checks if the gameId is within the collections's data
        const isGameInCollection = collection_response.data.some(item => parseInt(item.game) === parseInt(gameId));
        setIsGameInCollection(isGameInCollection);


        setLoading(false);
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

      //Checks if the game is the collection
      const collection_response = await api.get("v1/collection/");
      const isGameInCollection = collection_response.data.some(item => parseInt(item.game) === parseInt(gameId));
        setIsGameInCollection(isGameInCollection);

        //Removes the game from the collection if added to the backlog
        if (isGameInCollection) {
          await api.delete(`v1/collection/remove/${gameId}/`, { game_id: gameId });
        }
        setIsGameInCollection(!isGameInCollection);
    }

    // Update the state after the action
    setIsGameInBacklog(!isGameInBacklog);

    
  } catch (error) {
    console.error(error);
  }
};

//finds the developer of the game
function findDeveloperCompanyName(involvedCompanies) {
  const developerCompany = involvedCompanies.find(company => company.developer === true);

  if (developerCompany) {
    return developerCompany.company.name;
  }
}


return (
  <div>
    {loading ? (
      <p>Loading...</p>
    ) : ( 
    <div >
      <div className="flex p-4 bg-slate-600 rounded-lg shadow-lg">
      <div className="flex-shrink-0">
    <img
      src={`https:${game.cover.url.replace("/t_thumb/", "/t_cover_big/")}`}
      alt={game.name}
      className="object-contain rounded-lg"
    />

    <div className=" flex flex-col row-auto space-y-1 mt-2">
      <button onClick={() => navigate(`/addgame/${gameId}`)} className=" bg-blue-600 hover:bg-blue-400 text-white text-sm font-semibold py-1 px-1 rounded">
        {isGameinCollection ? "Edit Game" : "Add to Collection"}
      </button>
      <button onClick={handleBacklog} className="bg-blue-600 hover:bg-blue-400 text-white text-sm font-semibold py-1 px-1 rounded">
        {isGameInBacklog ? "Remove from Backlog" : "Add to Backlog"}
      </button>
    </div>

  </div>
  <div className="ml-2">
    <h1 className="text-2xl font-bold">{game.name}</h1>
    <h2>{findDeveloperCompanyName(game.involved_companies)}</h2>
    <p className=" text-xs">{game.summary}</p>

      <div className="mt-4">
        <h3 className=" text-sm font-thin">Platforms: {game.platforms.map((platform, index) => (
          `${platform.name}${index < game.platforms.length - 1 ? ', ' : ''}`
        ))}</h3>
        <h4 className=" text-sm font-thin">Genres: {game.genres.map((genre, index) => (
          `${genre.name}${index < game.genres.length - 1 ? ', ' : ''}`
        ))}</h4>
      </div>

    </div>
  </div>
  <div className=" flex row-auto m-5 justify-center">
      <div >
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${game.videos[0].video_id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        ></iframe>
      </div>
      
      <div className="ml-3">
      <div className="flex columns-md row-auto m-1 mt-0">
        <img src={`https:${game.screenshots[0].url.replace("/t_thumb/", "/t_logo_med/")}`} alt={game.name} />
        <img className="ml-1" src={`https:${game.screenshots[1].url.replace("/t_thumb/", "/t_logo_med/")}`} alt={game.name} />
        </div>
        <div className="flex columns-md row-auto m-1">
        <img src={`https:${game.screenshots[2].url.replace("/t_thumb/", "/t_logo_med/")}`} alt={game.name} />
        <img className="ml-1" src={`https:${game.screenshots[3].url.replace("/t_thumb/", "/t_logo_med/")}`} alt={game.name} />
        </div>
      </div>
    </div>
      <Reviews />
    </div>
    
  )}
</div>
);
};
