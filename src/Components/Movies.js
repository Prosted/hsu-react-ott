import { Movie } from "./Movie"

//Styles
import styles from "../styles/Movies.module.css";

export const Movies = ({movies}) => {
    return(
        <div className={styles.container}>
            {movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
        </div>
    )
}