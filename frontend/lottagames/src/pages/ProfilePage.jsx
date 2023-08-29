import { useContext, useEffect } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";

export const ProfilePage = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  
  const whoAmI = async() => {
    let token = localStorage.getItem("token") 
    console.log("Retrieved token:", token);
    if (token){
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("users/")
      setUser(response.data)
      // navigate("/home")
    }
    else {
      setUser(null)
      navigate("/login")
    }
  }

  useEffect(() => {
    // Fetch user data when the component mounts
    whoAmI();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mt-8">
        <div className="rounded-full overflow-hidden border-2 border-gray-300 w-20 h-20">
          {/* Use user.avatar or any other property for the image source */}
          <img
            src= "https://imgix.bustle.com/inverse/7c/d8/11/b6/1be8/4b09/a0b5/914dca4399eb/a-gollum-game-is-coming.jpeg?w=920&h=560&fit=crop&crop=faces&auto=format%2Ccompress"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-semibold">{user ? user.name : null}</h1>
        </div>
      </div>
      <div className="bg-gray-800 w-full flex justify-center mt-8 space-x-4 bg">
        <p className=" hover:underline cursor-pointer">
          <span>Collection</span>
        </p>
        <p className=" hover:underline cursor-pointer">
          <span>Backlog</span>
        </p>
        <p className=" hover:underline cursor-pointer">
          <span>Currently Playing</span>
        </p>
      </div>
    </div>
  );
};
