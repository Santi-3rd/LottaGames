import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities";

export const ChangeUsername = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(userContext);
    const [name, setName] = useState("")

    // console.log(user.name)
    // console.log(name)

    const handleSubmit = async () => {
        const response = await api.put('users/update_username/',{ name : name });
        console.log(response.data)
        setUser(response.data); 
    }

    return (
        <div className="mt-20 flex flex-col justify-center items-center gap-2">
            <div>
                <div>
                    <h1>Enter New Username</h1>
                    <input className="border-[4px] border-x-black border-y-black text-black"
                        type="text"  
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={user.name}
                    />
                </div>
                <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-1 rounded focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => {
                        handleSubmit();
                        navigate("/profile");
                    }}>Submit</button>
            
            </div>
        </div>
    )

}

