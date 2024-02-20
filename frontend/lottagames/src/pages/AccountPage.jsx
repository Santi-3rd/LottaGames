import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";



export const AccountPage = () => {
    const { user } = useContext(userContext);    



    return (
        <div>{user.name} {user.email}</div>
    )
}

