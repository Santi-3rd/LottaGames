import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";
import { ChangeUsername } from "../components/ChangeUsername.jsx";
import { ChangeEmail } from "../components/ChangeEmail.jsx";
import { ChangePassword } from "../components/ChangePassword.jsx";



export const AccountPage = () => {
    const { user, setUser } = useContext(userContext);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const [activeSetting, setActiveSetting] = useState("changeUsername")

    useEffect(() => {
        
    })

    const showSettings = () => {
        if (activeSetting == "changeUsername"){
            return <ChangeUsername />;
        }
        if (activeSetting == "changeEmail"){
            return <ChangeEmail />;
        }
        if (activeSetting == "changePassword"){
            return <ChangePassword />;
        }
    }

    return (
        <div>
            <div>
                <form className="mt-20 flex flex-col justify-center items-center gap-2">
                    <h1>Acccount Settings</h1>
                    <div className="bg-gray-800 w-full flex justify-center mt-8 space-x-4 bg">
                        <p className={`hover:underline cursor-pointer ${activeSetting === "changeUsername" ? "text-blue-500" : "text-gray-400"}`}>
                        <span onClick={() => { setActiveSetting("changeUsername")}}>Change Username</span>
                        </p>
                        <p className={`hover:underline cursor-pointer ${activeSetting === "changeEmail" ? "text-blue-500" : "text-gray-400"}`}>
                        <span onClick={() => { setActiveSetting("changeEmail")}}>Change Email</span>
                        </p>
                        <p className={`hover:underline cursor-pointer ${activeSetting === "changePassword" ? "text-blue-500" : "text-gray-400"}`}>
                        <span onClick={() => { setActiveSetting("changePassword")}}>Change Password</span>
                        </p>
                    </div>
                </form>
                {showSettings()}
            </div> 
        </div>
    )
}

