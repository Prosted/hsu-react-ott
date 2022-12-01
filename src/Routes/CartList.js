import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Data
import { getCurrentUser } from "../Data/UserData";
import { getMovies } from "../Data/MovieDataController";
import { getCartMovieIdList } from "../Data/UserDBController";

//Component
import { Movie } from "../Components/Movie";
import { HeaderTemplate } from "../Components/Template";

//Styles
import styles from "../styles/List.module.css";

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


    if(movies.length == 0) return <HeaderTemplate><div className={styles.background}><h1 className={styles.topText}>Nothing in Cart List</h1></div></HeaderTemplate>;
    if(movies)
    {
        return (
            <HeaderTemplate>
                <div className={styles.background}>
                    <div className={styles.topGroup}>
                        <h1 className={styles.topText}>My CartList</h1>
                        <div className={styles.button}><Link className={styles.link} to={"/pay"}>결제하기</Link></div>
                    </div>
                    <div className={styles.grid}>
                        {movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
                    </div>
                </div>
            </HeaderTemplate>
        )
    }
}