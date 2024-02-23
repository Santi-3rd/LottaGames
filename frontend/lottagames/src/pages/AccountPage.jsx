import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";



export const AccountPage = () => {
    const { user } = useContext(userContext); 
    const [password, setPassword] = useState("");   
    const [activeSetting, setActiveSetting] = useState("Change Username")

    useEffect(() => {
        
    })

    return (
        <div>
            <div>
                <form className="mt-20 flex flex-col justify-center items-center gap-2">
                    <h1>Acccount Settings</h1>
                    <div className="bg-gray-800 w-full flex justify-center mt-8 space-x-4 bg">
                        <p className={`hover:underline cursor-pointer ${activeSetting === "Change Username" ? "text-blue-500" : "text-gray-400"}`}>
                        <span onClick={() => { setActiveSetting("changeUsername")}}>Change Username</span>
                        </p>
                        <p className={`hover:underline cursor-pointer ${activeSetting === "Change Username" ? "text-blue-500" : "text-gray-400"}`}>
                        <span onClick={() => { setActiveSetting("changeEmail")}}>Change Email</span>
                        </p>
                        <p className={`hover:underline cursor-pointer ${activeSetting === "Change Username" ? "text-blue-500" : "text-gray-400"}`}>
                        <span onClick={() => { setActiveSetting("changePassword")}}>Change Password</span>
                        </p>
                    </div>
                    <input className="border-[4px] border-x-black border-y-black text-black"
                    type="text"  
                    value=""
                    onChange={(e) => setName(e.target.value)}
                    placeholder={user.name}
                    />
                    <input className="border-[4px] border-x-black border-y-black text-black"
                    type="email"
                    value=""
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={user.email}
                    />
                    <h2>Change Password</h2>
                    <input className="border-[4px] border-x-black border-y-black text-black"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Old Password"
                    />
                    <input className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-2 rounded focus:outline-none focus:ring focus:border-blue-300" type="submit" 
                    />
                </form>
            </div> 
        </div>
    )
}

