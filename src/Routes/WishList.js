import { useEffect, useState } from "react";

//Data
import { getCurrentUser } from "../Data/UserData";
import { getMovies } from "../Data/MovieDataController";
import { getWishMovieIdList } from "../Data/UserDBController";

//Component
import { Movie } from "../Components/Movie";
import { HeaderTemplate } from "../Components/Template";

export const WishList = () => {
    const [movies, setMovies] = useState([]);
    
    const getWishMovies = () => {
        const {id} = getCurrentUser();
        const wishMovieIdList = getWishMovieIdList(id);
        const wishMovies = getMovies(wishMovieIdList);
        setMovies(wishMovies);
    }

    useEffect(()=>{
        getWishMovies();
    }, []);

    if(movies.length == 0) return <HeaderTemplate><div>Nothing in here</div></HeaderTemplate>;
    if(movies)
    {
        return (
            <HeaderTemplate>
                <div>
                    <h1>My WishList</h1>
                    <div>
                        {movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
                    </div>
                </div>
            </HeaderTemplate>
        )
    }
}