import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

//Data
import { getMovies } from "../Data/MovieDataController";
import { getPurchaseMovieIdList } from "../Data/UserDBController";

//Component
import { Movie } from "../Components/Movie";
import { HeaderTemplate } from "../Components/Template";

export const MyMovies = () => {
    const {username} = useParams();
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const getPurchaseMovies = () => {
        const purchaseMovieIdList = getPurchaseMovieIdList(username);
        const purchaseMovies = getMovies(purchaseMovieIdList);
        setMovies(purchaseMovies);
    }

    useEffect(()=>{
        getPurchaseMovies();
    }, [])

    if(movies.length == 0) return <HeaderTemplate><div>Nothing in here</div></HeaderTemplate>;
    if(movies)
    {
        return (
            <HeaderTemplate>
                <div>
                    <h1>My Movie List</h1>
                    <div>
                        {movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
                    </div>
                </div>
            </HeaderTemplate>
        )
    }
}