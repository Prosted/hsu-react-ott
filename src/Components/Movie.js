import { Link } from "react-router-dom"

//Styles
import styles from "../styles/Movie.module.css";

export const Movie = ({movie}) => {
    const poster_url = movie.poster_url;
    const title = movie.title;
    const id = movie.id;
    return (
        <div className={styles.container}>
            <Link to={`/movie/${id}`}><img src={poster_url} alt={title} /></Link>
            <h3 className={styles.title}>{title}</h3>
        </div>
    )
}