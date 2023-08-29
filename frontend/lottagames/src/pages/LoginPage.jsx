import { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";

export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault();
    let response = await api.post("users/login/", {
      email: userName,
      password: password,
    })
    .catch((err) => {
      alert("Incorrent Credentials")
    })
    let user = response.data.user;
    let token = response.data.token;
    setUser(user);
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`
    navigate("/library"); 
  };


  return (
    <form className="h-screen flex flex-col justify-center items-center gap-2" onSubmit={(e) => logIn(e)}>
      <h5>Log In</h5>
      <input className="border-[4px] border-x-black border-y-black text-black"
        type="email"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="email"
      />
      <input className="border-[4px] border-x-black border-y-black text-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <input className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-2 rounded focus:outline-none focus:ring focus:border-blue-300" type="submit" />
    </form>
  );
};
