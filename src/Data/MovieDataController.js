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
    const [genre1, genre2, genre3] = genres;
    let similarMovies = [];
    
    //1. 장르가 똑같은 다른 영화들을 불러옴
    for(let i=0; i<MovieData.length; i++)
    {
        const movie = MovieData[i];
        if(movie.id != currentMovieId)
        {
            if(movie.genres.includes(genre1) || movie.genres.includes(genre2) || movie.genres.includes(genre3))
            {
                similarMovies.push(movie);
            }
        }
    }
    
    const max = 4;
    let result = [];
    let saveRans = [];
    //2. similarMovies에서 최대 개수만큼 랜덤으로 영화를 불러옴
    for(let i=0; i<max; i++)
    {
        let ran = Math.floor(Math.random() * similarMovies.length);
        while(saveRans.includes(ran))
        {
            ran = Math.floor(Math.random() * similarMovies.length);
        }
        saveRans.push(ran);
        result.push(similarMovies[ran]);
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