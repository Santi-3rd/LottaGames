import { useParams,} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import { api } from "../utilities.jsx"
import { userContext } from "../App";
import { Reviews } from "../components/Reviews.jsx";

export const AddGame = () => {
    const { gameId } = useParams();
    const { games, setGames } = useContext(userContext);
    const [isGameInCollection, setIsGameInCollection] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null); // State to track the selected status

    console.log(selectedStatus)

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleSubmit = async () => {
        try {
          if (isGameInCollection) {
            await api.delete(`v1/collection/remove/`, { game_id: gameId });
          } else {
            await api.post("v1/collection/add/", { gameStatus: selectedStatus});
          }
      
          // Update the state after the action
          setIsGameInCollection(!isGameInCollection);
      
          
        } catch (error) {
          console.error(error);
        }
  };





return (

    <div>
        <h1>{games[0].name}</h1>

        <img src={games[0].cover?.url} alt={games.name}/>
        <div>
        <label>
          <input
            type="radio"
            name="status"
            value="currently_playing"
            checked={selectedStatus === "currently_playing"}
            onChange={() => handleStatusChange("currently_playing")}
          />
          Currently Playing
        </label>

        <label>
          <input
            type="radio"
            name="status"
            value="beaten"
            checked={selectedStatus === "beaten"}
            onChange={() => handleStatusChange("beaten")}
          />
          Beaten
        </label>

        <label>
          <input
            type="radio"
            name="status"
            value="completed"
            checked={selectedStatus === "completed"}
            onChange={() => handleStatusChange("completed")}
          />
          Completed
        </label>

        <label>
          <input
            type="radio"
            name="status"
            value="dropped"
            checked={selectedStatus === "dropped"}
            onChange={() => handleStatusChange("dropped")}
          />
          Dropped
        </label>
        </div>
        <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300" onClick={handleSubmit}>{isGameInCollection ? "Remove" : "Submit"}</button>
        {/* <Reviews/> */}
    </div>
    )
}