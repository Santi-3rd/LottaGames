import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

export const ChangeUsername = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(userContext);
    const [name, setName] = useState("")

    return (
        <div className="mt-20 flex flex-col justify-center items-center gap-2">
            <div>
                <form>
                    <div>
                        <h1>Enter New Username</h1>
                        <input className="border-[4px] border-x-black border-y-black text-black"
                            type="text"  
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={user.name}
                        />
                    </div>
                    <input className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-2 rounded focus:outline-none focus:ring focus:border-blue-300" type="submit" 
                    />
                </form>
            </div>
        </div>
    )

}

