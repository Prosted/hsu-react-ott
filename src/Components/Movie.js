import { Link } from "react-router-dom"

export const Movie = ({movie}) => {
    const poster_url = movie.poster_url;
    const title = movie.title;
    const id = movie.id;
    return (
        <div>
            <Link to={`/movie/${id}`}><img src={poster_url} alt={title} width="300px" height="400px"/></Link>
            <h3>{title}</h3>
        </div>
    )
}