import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

export const ChangePassword = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(userContext);
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    return (
        <div className="mt-20 flex flex-col justify-center items-center gap-2">
            <div>
                <form>
                    <div>
                    <h1>Enter Old Password</h1>
                        <input className="border-[4px] border-x-black border-y-black text-black"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Old Password"
                        />
                        <h1>Enter New Password</h1>
                        <input className="border-[4px] border-x-black border-y-black text-black"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        />
                    </div>
                    <input className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-2 rounded focus:outline-none focus:ring focus:border-blue-300" type="submit" 
                    />
                </form>
            </div>
        </div>
    )
}