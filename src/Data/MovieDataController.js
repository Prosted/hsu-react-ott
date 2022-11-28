import MovieData from "../Data/MovieData.json";

export const getMovie = (findId) => {
    for(let i=0; i<MovieData.length; i++)
    {
        const movie = MovieData[i];
        if(movie.id == findId) return movie; 
    }
    return null;
}

export const getSimilarGenresMovies = (genres, currentMovieId) => {
    const max = 4;
    let count = 0;

    const [genre1, genre2, genre3] = genres;
    let result = [];
    for(let i=0; i<MovieData.length; i++)
    {
        const movie = MovieData[i];
        if(movie.id != currentMovieId && count < max)
        {
            if(movie.genres.includes(genre1) || movie.genres.includes(genre2) || movie.genres.includes(genre3))
            {
                result.push(movie);
                count++;
            }
        }
    }
    return result;
}

export const getMovies = (findIdList) => {
    let movies = [];
    for(let i=0; i<findIdList.length; i++)
    {
        for(let j=0; j<MovieData.length; j++)
        {
            const movie = MovieData[j]; 
            if(movie.id == findIdList[i])
            {
                movies.push(movie);
                break;
            } 
        }
    }
    return movies;
}