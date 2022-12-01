import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

//Data
import { setUser, getUser, isUserLoggedIn } from "../Data/UserData";
import { loadJSON } from "../Data/UserDBController";

//Component
import { SimpleForm } from "../Components/SimpleForm";

//styles
import styles from "../styles/Join.module.css";

export const Join = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorPopup, setErrorPopup] = useState(false);
    const errorMessage = "이미 존재하는 아이디입니다.";
    const buttonText = "Sign up";


    useEffect(()=>{
        const checkUserLoggedIn = isUserLoggedIn();
        if(checkUserLoggedIn) navigate("/");
    }, []);
    
    const handleId = (event) => {
        const value = event.target.value;
        setId(value);
    }

    const handlePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const checkUserExists = getUser(id);
        
        setId("");
        setPassword("");

        if(checkUserExists)
        {
            setErrorPopup(true);
        }
        else
        {
            const isUserDBAlreadyExists = loadJSON(id);
            if(isUserDBAlreadyExists) localStorage.removeItem(id);
             
            setUser({id, password});
            setErrorPopup(false);
            navigate("/login");
        }
    }

    return(
        <div className={styles.background}>
            <SimpleForm handleId={handleId} handlePassword={handlePassword} handleSubmit={handleSubmit} id={id} password={password} buttonText={buttonText} errorPopup={errorPopup} errorMessage={errorMessage} />
            <div className={styles.linkGroup}>
                <h3 className={styles.linkTitle}>Already have your Account?</h3>
                <div className={styles.linkContainer}><Link className={styles.link} to={"/login"}>Go to login</Link></div>
            </div>
        </div>
    )
}