import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Data
import { getCurrentUser } from "../Data/UserData";
import { getMovies } from "../Data/MovieDataController";
import { getCartMovieIdList } from "../Data/UserDBController";

//Component
import { Movie } from "../Components/Movie";
import { HeaderTemplate } from "../Components/Template";

export const CartList = () => {
    const [movies, setMovies] = useState([]);

    const getCartMovies = () => {
        const {id} = getCurrentUser();
        const cartMovieIdList = getCartMovieIdList(id);
        const cartMovies = getMovies(cartMovieIdList);
        setMovies(cartMovies);
    }

    useEffect(()=>{
        getCartMovies();
    }, [])


    if(movies.length == 0) return <HeaderTemplate><div>Nothing...</div></HeaderTemplate>;
    if(movies)
    {
        return (
            <HeaderTemplate>
                <div>
                    <h1>CartList!</h1>
                    <div>
                        {movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
                    </div>
                    <Link to={"/pay"}><div>결제하기</div></Link>
                </div>
            </HeaderTemplate>
        )
    }
}