import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";
import { ListedGame } from "../components/ListedGame";

export const ProfilePage = () => {
  const { user, setUser, games, setGames } = useContext(userContext);
  const [filteredGames, setFilteredGames] = useState(null)
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
    // Fetch data from the API
    api.get('v1/collection/')
      .then(response => {
        // Filter the games that have game_status as 'currently_playing'
        const filteredGames = response.data.filter(item => item.game_status === 'currently_playing');
        setFilteredGames(filteredGames); // Update the filteredGames state
        console.log(filteredGames);
  
        // Fetch additional data for each game using a loop
        const gamePromises = filteredGames.map(game => {
          const gameId = game.game;
          return api.post("v1/collection/view/", { idQuery: gameId })
            .then(igdb_response => {
              return igdb_response.data;
            })
            .catch(error => {
              console.error(`Error fetching data for Game ID ${gameId}:`, error);
            });
        });
  
        // Use Promise.all to wait for all game data requests to complete
        Promise.all(gamePromises)
          .then(gameDataArray => {
            // Flatten the array of game data objects
            const allGamesData = gameDataArray.flatMap(gameData => gameData.games);
            setGames(allGamesData); // Update the games state with additional data
          })
          .catch(error => {
            console.error('Error fetching game data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    whoAmI();
  }, []);

  //SHOWS BACKLOG
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

  //SHOWS COLLECTION
  const showCollection = async () => {
    try {
      const collection_response = await api.get("v1/collection/");
  
      const gamePromises = collection_response.data.map(async (collectionItem) => {
        const gameId = collectionItem.game;
        const igdb_response = await api.post("v1/collection/view/", { idQuery: gameId });
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

  const showCurrentlyPlaying = async (filteredGames) => {
    try {
      const gamePromises = filteredGames.map(async (game) => {
        const gameId = game.game;
        const igdb_response = await api.post("v1/collection/view/", { idQuery: gameId });
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
          <span onClick={showCollection}>Collection</span>
        </p>
        <p className="hover:underline cursor-pointer">
        <span onClick={() => showCurrentlyPlaying(filteredGames)}>Currently Playing</span>
        </p>
        <p className="hover:underline cursor-pointer">
          <span onClick={showBacklog}>Backlog</span>
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
