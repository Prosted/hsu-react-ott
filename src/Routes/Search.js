import { useState } from "react";

//Component
import { Movie } from "../Components/Movie";
import { HeaderTemplate } from "../Components/Template";

//Data
import MovieData from "../Data/MovieData.json"

export const Search = () => {
    const [movies, setMovies] = useState();
    const [keyword, setKeyword] = useState();

    const handleSearch = (event) => {
        const value = event.target.value;
        setKeyword(value);

        let searchMovies = [];
        for(let i=0; i<MovieData.length; i++)
        {
            const movie = MovieData[i];
            if(movie.title.includes(value)) searchMovies.push(movie); 
        }

        setMovies(searchMovies);
    }

    return (
        <HeaderTemplate>
            <div>
                <div>
                    <input value={keyword || ""} onChange={handleSearch} type="text" name="search" placeholder="Keyword"/>
                </div>
                <div>
                    {movies == null ? "" : movies.map((movie) => <Movie key={movie.key} movie={movie} />)}
                </div>
            </div>
        </HeaderTemplate>
    )
}