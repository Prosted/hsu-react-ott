import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Component
import { Movies } from "../Components/Movies";
import { HeaderTemplate } from "../Components/Template";

//Data
import MovieData from "../Data/MovieData.json";
import { getCurrentUser } from "../Data/UserData";

export const Home = () => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);
    const [dramas, setDramas] = useState([]);
    const [horrors, setHorros] = useState([]);
    const [actions, setActions] = useState([]);
    const [SFs, setSFs] = useState([]);
    const [rating, setRating] = useState([]);
    const navigate = useNavigate();
    let filtered_dramas;
    let filtered_SFs;
    let filtered_horrors;
    let filtered_actions;
    let filtered_rating;
    const genreRandom = 4;
    const topRatingCount = 4;
    
    //영화 필터링
    useEffect(()=>{
        FilteringMovies();
    }, []);
    
    //로그인 확인
    useEffect(()=>{
        checkLogin();
    }, []);

    const FilteringMovies = () => {
        //1. MovieData의 영화들을 장르에 맞춰 나눈다.
        filtered_dramas = genreFilter("드라마");
        filtered_SFs = genreFilter("SF");
        filtered_horrors = genreFilter("공포");
        filtered_actions = genreFilter("액션");
        filtered_rating = ratingFilter();

        //2. 로딩 끝. 재 렌더링
        setDramas(filtered_dramas);
        setSFs(filtered_SFs);
        setHorros(filtered_horrors);
        setActions(filtered_actions);
        setRating(filtered_rating);
        setLoading(true);
    }

    const checkLogin = () => {
        const user = getCurrentUser();
        if(!user)
        {
            navigate("/welcome");
        }
        setCurrentUser(user);
    }

    const genreFilter = (genre) => {
        const value = MovieData.filter(movie => movie.genres.includes(genre));
        const result = [];
        let saveRans = [];
        for(let i=0; i<genreRandom; i++)
        {
            let ran = Math.floor(Math.random() * value.length);
            while(saveRans.includes(ran))
            {
                ran = Math.floor(Math.random() * value.length);
            }
            saveRans.push(ran);
            result.push(value[ran]);
             
        }
        return result;
    }

    const ratingFilter = () => {
        const value = MovieData.sort((a, b) => b.rating - a.rating);
        const result = [];
        for(let i=0; i<topRatingCount; i++)
        {
            result.push(value[i]);
        }
        return result; 
    }
    
    //로딩 중이면 
    if(!loading)
    {  
        if(currentUser == null) return <div><h1>Loading...</h1></div>
        else return (
            <HeaderTemplate>
                <div>
                    <h1>Loading...</h1>
                </div>
            </HeaderTemplate>
        )
    }
    else //로딩이 끝났으면
    {
        return (
            <HeaderTemplate>
                <div>
                    <div></div>
                    <div>
                        <Movies movies={dramas}/>
                         <h1>----------SF----------</h1>
                        <Movies movies={SFs}/>
                         <h1>----------horrors----------</h1>
                        <Movies movies={horrors}/>
                         <h1>----------actions----------</h1>
                        <Movies movies={actions}/>
                         <h1>----------rating----------</h1>
                        <Movies movies={rating}/>
                    </div>
                </div>
            </HeaderTemplate>
        )
    }
}