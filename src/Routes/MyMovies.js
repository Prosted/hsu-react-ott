import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

//Data
import { getMovies } from "../Data/MovieDataController";
import { getPurchaseMovieIdList } from "../Data/UserDBController";

//Component
import { Movie } from "../Components/Movie";
import { HeaderTemplate } from "../Components/Template";

//Styles
import styles from "../styles/List.module.css";

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

    if(movies.length == 0) return <HeaderTemplate><div className={styles.background}><h1 className={styles.topText}>Nothing in here</h1></div></HeaderTemplate>;
    if(movies)
    {
        return (
            <HeaderTemplate>
                <div className={styles.background}>
                    <div className={styles.topGroup}>
                        <h1 className={styles.topText}>My Movie List</h1>
                    </div>
                    <div className={styles.grid}>
                        {movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
                    </div>
                </div>
            </HeaderTemplate>
        )
    }
}