import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Library = () => {
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
   
    // search logic for api
    setInputValue(""); 
  };

  return (
    <div>
      <h1>Library</h1>
      <input className="text-black" type="text" 
      value={inputValue} 
      onChange={(event) => setInputValue(event.target.value)}
      placeholder="search" />
      <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300" onClick={handleSearch}>Search</button>
    </div>
  );
};
