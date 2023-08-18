import { useEffect, useState} from "react";
import "./App.css";
import { Link, Outlet, useNavigate} from "react-router-dom";
import { createContext } from "react";
import { api } from "./utilities.jsx";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

const whoAmI = async() => {
  console.log("Attempting to retrieve token from localStorage...");
  let token = localStorage.getItem("token") 
  console.log("Retrieved token:", token);
  if (token){
    api.defaults.headers.common["Authorization"] = `Token ${token}`
    let response = await api.get("users/")
    setUser(response.data)
    navigate("/home")
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
  console.log("Attempting to remove token from localStorage...");
  let response = await api.post("users/logout/")
  console.log("Removed token:", token);
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
            <Link to="/home">Home</Link>
            <Link to="/library">Library</Link>
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
      <userContext.Provider value={{ user, setUser }}>
        <Outlet />
      </userContext.Provider>
    </div>
  );
}

export default App;
