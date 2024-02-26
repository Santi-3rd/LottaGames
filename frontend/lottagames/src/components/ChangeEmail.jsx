import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

export const ChangeEmail = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(userContext);
    const [oldEmail, setOldEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")


    const handleSubmit = async () => {
        const response = await api.put('users/update_email/', { oldEmail, email : newEmail});
        setUser(response.data); 
    }

    return (
        <div className="mt-20 flex flex-col justify-center items-center gap-2">
            <div>
                <form>
                    <div>
                        <h1>Enter Old Email Address</h1>
                        <input className="border-[4px] border-x-black border-y-black text-black"
                        type="email"
                        value={oldEmail}
                        onChange={(e) => setOldEmail(e.target.value)}
                        placeholder=""
                        />
                        <h1>Enter New Email Address</h1>
                        <input className="border-[4px] border-x-black border-y-black text-black"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder=""
                        />
                    </div>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => {
                        handleSubmit();
                        navigate("/profile");
                    }}>Submit</button>
                </form>
            </div>
        </div>
    )

}