import { useEffect, useState } from "react";

//Data
import { getCurrentUser } from "../Data/UserData";
import { getMovies } from "../Data/MovieDataController";
import { getWishMovieIdList } from "../Data/UserDBController";

//Component
import { Movie } from "../Components/Movie";
import { HeaderTemplate } from "../Components/Template";

//Styles
import styles from "../styles/List.module.css";

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

    if(movies.length == 0) return <HeaderTemplate><div className={styles.background}><h1 className={styles.topText}>Nothing in WishList</h1></div></HeaderTemplate>;
    if(movies)
    {
        return (
            <HeaderTemplate>
                <div className={styles.background}>
                    <div className={styles.topGroup}>
                        <h1 className={styles.topText}>My WishList</h1>
                    </div>
                    <div className={styles.grid}>
                        {movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
                    </div>
                </div>
            </HeaderTemplate>
        )
    }
}