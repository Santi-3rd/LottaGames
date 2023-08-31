import { useContext, useEffect } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";
import { ListedGame } from "../components/ListedGame";

export const ProfilePage = () => {
  const { user, setUser, games, setGames } = useContext(userContext);
  const navigate = useNavigate();
  
  const whoAmI = async() => {
    let token = localStorage.getItem("token") 
    console.log("Retrieved token:", token);
    if (token){
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("users/")
      setUser(response.data)
    }
    else {
      setUser(null)
      navigate("/login")
    }
  }

  useEffect(() => {
    
    whoAmI();
  }, []);

  const showBacklog = async () => {
    try {
      const backlog_response = await api.get("v1/backlog/");
  
      const gamePromises = backlog_response.data.map(async (backlogItem) => {
        const gameId = backlogItem.game;
        const igdb_response = await api.post("v1/backlog/view/", { idQuery: gameId });
        return igdb_response.data;
      });
  
      const gameDataArray = await Promise.all(gamePromises);
  
      // Flatten the array of game data objects
      const allGamesData = gameDataArray.flatMap((gameData) => gameData.games);
  
      setGames(allGamesData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mt-8">
        <div className="rounded-full overflow-hidden border-2 border-gray-300 w-20 h-20">
          <img
            src="https://imgix.bustle.com/inverse/7c/d8/11/b6/1be8/4b09/a0b5/914dca4399eb/a-gollum-game-is-coming.jpeg?w=920&h=560&fit=crop&crop=faces&auto=format%2Ccompress"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-semibold">{user ? user.name : null}</h1>
        </div>
      </div>
      <div className="bg-gray-800 w-full flex justify-center mt-8 space-x-4 bg">
        <p className="hover:underline cursor-pointer">
          <span>Collection</span>
        </p>
        <p className="hover:underline cursor-pointer">
          <span onClick={showBacklog}>Backlog</span>
        </p>
        <p className="hover:underline cursor-pointer">
          <span>Currently Playing</span>
        </p>
      </div>
      <div className="flex flex-col space-y-4 mt-3">
        {games.map((game, index) => (
          <ListedGame key={index} game={game} />
        ))}
      </div>
    </div>
  );
};
