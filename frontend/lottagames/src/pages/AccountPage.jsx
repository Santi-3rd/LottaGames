import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";



export const AccountPage = () => {
    const { user } = useContext(userContext);    



    return (
        <div>
            <div>
                <form className="mt-20 flex flex-col justify-center items-center gap-2">
                    <h1>Acccount Settings</h1>
                    <h5>User Name</h5>
                    <input className="border-[4px] border-x-black border-y-black text-black"
                    type="text"  
                    value=""
                    onChange={(e) => setName(e.target.value)}
                    placeholder={user.name}
                    />
                    <h2>Email</h2>
                    <input className="border-[4px] border-x-black border-y-black text-black"
                    type="email"
                    value=""
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={user.email}
                    />
                    <input className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-1 px-2 rounded focus:outline-none focus:ring focus:border-blue-300" type="submit" 
                    />
                </form>
            </div> 
        </div>
    )
}

