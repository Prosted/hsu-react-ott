import { Movie } from "./Movie"

export const Movies = ({movies}) => {
    return(
        <div>
            {movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
        </div>
    )
}