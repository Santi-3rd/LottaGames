import { useEffect, useState} from "react";
import "./App.css";
import { Link, Outlet, useNavigate} from "react-router-dom";
import { createContext, useContext } from "react";
import { api } from "./utilities.jsx";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

const whoAmI = async() => {
  let token = localStorage.getItem("token") 
  console.log("Retrieved token:", token);
  if (token){
    api.defaults.headers.common["Authorization"] = `Token ${token}`
    let response = await api.get("users/")
    setUser(response.data)
    navigate("/library")
  }
  else {
    setUser(null)
    navigate("/login")
  }
}

useEffect(()=>{
  whoAmI()
}, [])

const logOut = async() => {
  let response = await api.post("users/logout/")
  if(response.status === 204){
    localStorage.removeItem("token")
    setUser(null)
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  }
}

  return (
    <div id="app">
      <header>
        <nav>
          { 
            user
            ?
            <>
            <Link to="/profile">Profile</Link>
            <Link to="/library">Games</Link>
            <button onClick={logOut}>Log out</button>
            </>
            :
            <>
            <Link to="/">Sign Up</Link>
            <Link to="/login">Log In</Link>
            </>
          }
        </nav>
      </header>
      <userContext.Provider value={{ user, setUser, games, setGames }}>
        <Outlet />
      </userContext.Provider>
    </div>
  );
}

export default App;
