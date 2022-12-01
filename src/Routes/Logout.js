import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

//Data
import { isUserLoggedIn, logout } from "../Data/UserData";

export const Logout = () => {
    const navigate = useNavigate();
    
    useEffect(()=>{
        const checkUserLoggedIn = isUserLoggedIn();
        if(!checkUserLoggedIn) navigate("/");
        
        logout();
        navigate("/welcome");
    })
}