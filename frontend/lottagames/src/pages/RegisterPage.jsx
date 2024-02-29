import { useState, useContext } from "react";
import { userContext } from "../App";
import { api } from "../utilities.jsx";
import { useNavigate } from "react-router-dom";
import { Welcome } from "../components/Welcome";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [password, setPassword] = useState("");
  const [confirmedPassword, setconfirmedPassword] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    if (password === confirmedPassword){
    let response = await api.post("users/register/", {
      email: email,
      name: name,
      password: password,
    })
    .catch((err) => {
      alert("Incorrent Credentials")
    })
    
    let user = response.data.user;
    let token = response.data.token;

    // Store the token securely (e.g., in localStorage or HttpOnly cookies)
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    // set the user using with useContext to allow all other pages that need user information
    setUser(user);
    navigate("/profile");

  } else {
    alert("Passwords do not match.")
  }
  };

  return ( 
    <div>
      <Welcome />
    <form className="mt-20 flex flex-col justify-center items-center gap-2" onSubmit={(e) => signUp(e)}>
      <h5>Sign Up</h5>
      <input className="border-[4px] border-x-black border-y-black text-black"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input className="border-[4px] border-x-black border-y-black text-black"
        // username
        type="text"  
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Username"
      />
      <input className="border-[4px] border-x-black border-y-black text-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input className="border-[4px] border-x-black border-y-black text-black"
        type="password"
        value={confirmedPassword}
        onChange={(e) => setconfirmedPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <input className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-2 rounded focus:outline-none focus:ring focus:border-blue-300" type="submit" />
    </form>
    </div>
  );
};
