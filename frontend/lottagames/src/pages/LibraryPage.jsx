import { useState, useContext } from "react";
import { useNavigate, Link, Route } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities.jsx"
import { ListedGame } from "../components/ListedGame";

export const Library = () => {
  const [inputValue, setInputValue] = useState("");
  const { games, setGames } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
   
    setLoading(true);

    // search logic for api
    try {
      const response = await api.post("v1/library/", { searchQuery: inputValue }); 
       console.log(response.data)
       setGames(response.data.games)

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
      setInputValue("");
    }
  };

  return (
    <div>
      <h1>Game Library</h1>
      <input className="text-black" type="text" 
      value={inputValue} 
      onChange={(event) => setInputValue(event.target.value)}
      placeholder="search" />
      <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300" onClick={handleSearch}>Search </button>
      <div>
        {loading ? (<p>Loading...</p>
        ) : (
        <div className="flex flex-col space-y-4 mt-3 w-full max-w-md px-3 py-2 ">
        {games.map((game, index) => (
          <ListedGame key={index} game={game} />
        ))}
        </div>
        )}
      </div>
    </div>
  );
};
