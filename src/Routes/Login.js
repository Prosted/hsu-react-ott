import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

//Data
import { login, checkUserDBExists, makeUserDB, isUserLoggedIn } from "../Data/UserData";

//Component
import { SimpleForm } from "../Components/SimpleForm";

export const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorPopup, setErrorPopup] = useState(false);
    const errorMessage = "잘못된 아이디 또는 비밀번호입니다. 다시 확인해주세요.";
    const buttonText = "Login";

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

        const enteredUser = {id, password};
        const isSuccessLogin = login(enteredUser);

        setId("");
        setPassword("");

        if(!isSuccessLogin) //로그인 실패
        {
            setErrorPopup(true);
        }
        else //로그인 성공
        {
            //DB 존재 유무 검사
            if(!checkUserDBExists(id)) //DB가 없으면
            {
                makeUserDB(id); //새로 만든다
            }
            setErrorPopup(false);
            navigate("/");
        }
    }

    return(
        <div>
            <SimpleForm handleId={handleId} handlePassword={handlePassword} handleSubmit={handleSubmit} id={id} password={password} buttonText={buttonText} errorPopup={errorPopup} errorMessage={errorMessage} />
            <h3>No Accout? It's fine. just join us</h3>
            <Link to={"/join"}><div>Create Account</div></Link>
        </div>
    )
}