import { useState, useContext } from "react";
import { useNavigate, Link, Route } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities.jsx"
import { ListedGame } from "../components/ListedGame";

export const Library = () => {
  const [inputValue, setInputValue] = useState("");
  const { games, setGames } = useContext(userContext);
  const navigate = useNavigate();

  const handleSearch = async () => {
   
    // search logic for api
    try {
      const response = await api.post("v1/library/", { searchQuery: inputValue }); 
       console.log(response.data)
       setGames(response.data.games)


      // Process the responseData as needed
    } catch (error) {
      console.error(error);

      // Handle error if needed
    } finally {
      setInputValue("");
    }
  };

  return (
    <div>
      <h1>Library</h1>
      <input className="text-black" type="text" 
      value={inputValue} 
      onChange={(event) => setInputValue(event.target.value)}
      placeholder="search" />
      <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300" onClick={handleSearch}>Search </button>
      <div className="flex flex-col space-y-4 mt-3">
        {games.map((game, index) => (
          <ListedGame key={index} game={game} />
        ))}
      </div>
    </div>
  );
};
