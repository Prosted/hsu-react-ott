import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

//Data
import { getCurrentUser } from "../Data/UserData";
import { getMovie, getSimilarGenresMovies } from "../Data/MovieDataController";
import { loadJSON, saveJSON } from "../Data/UserDBController";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleCheck, faHeartCirclePlus, faCartPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons';

//Component
import { Movies } from "../Components/Movies";
import { HeaderTemplate } from "../Components/Template";

export const MovieDetail = () => {
    const [isWished, setIsWished] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [movie, setMovie] = useState();
    const [similarMovies, setSimilarMovies] = useState([]);
    const {id} = useParams();
    
    useEffect(()=>{
        const userId = getCurrentUser().id;
        checkIsPaid(userId);
        checkIsWished(userId);
        checkIsAddedToCart(userId);
        getMovieInfo();
    }, [id]);

    const checkIsWished = (userId) => {
        const {wishlist} = loadJSON(userId);
        wishlist.includes(id) ?  setIsWished(true) : setIsWished(false);
    }

    const checkIsAddedToCart = (userId) => {
        const {cartlist} = loadJSON(userId);
        cartlist.includes(id) ? setIsAddedToCart(true) : setIsAddedToCart(false);
    }

    const checkIsPaid = (userId) => {
        const {purchaselist} = loadJSON(userId);
        purchaselist.includes(parseInt(id)) ? setIsPaid(true) : setIsPaid(false); //왜 이것만 정수형으로 저장되는지? 추후 수정 필요
    }

    const getMovieInfo = () => {
        const movie = getMovie(id);
        const similarMovies = getSimilarGenresMovies(movie.genres, id);
        setMovie(movie);
        setSimilarMovies(similarMovies);
    }

    const handleWishListToggle = () => {
        if(isPaid)
        {
            alert("이미 결제한 영화입니다.");
            return;
        }

        //1. 현재 로그인한 유저 정보 가져옴
        const user = getCurrentUser();
        
        //2. 찜 목록에서 해당 영화의 id를 찾아 저장 혹은 삭제
        let userDB = loadJSON(user.id);
        let wishList = userDB.wishlist;
        let newWishList = [];
        if(isWished)
        {
            
            newWishList = wishList.filter(savedId => savedId != id);

        }
        else
        {
            newWishList = [...wishList, id];
        }
        userDB.wishlist = newWishList;
        saveJSON(user.id, userDB);
        setIsWished(!isWished);
    }

    const handleCartListToggle = () => {
        if(isPaid) 
        {
            alert("이미 결제한 영화입니다.");
            return;
        }

        //1. 현재 로그인한 유저 정보 가져옴
        const user = getCurrentUser();
        
        //2. 찜 목록에서 해당 영화의 id를 찾아 저장 혹은 삭제
        let userDB = loadJSON(user.id);
        let cartList = userDB.cartlist;
        let newCartList = [];
        if(isAddedToCart)
        {
            
            newCartList = cartList.filter(savedId => savedId !== id);
        }
        else
        {
            newCartList = [...cartList, id];
        }
        userDB.cartlist = newCartList;
        saveJSON(user.id, userDB);
        setIsAddedToCart(!isAddedToCart);
    }
    
    if(!movie) return <HeaderTemplate><div>Loading...</div></HeaderTemplate>
    if(movie)
    return(
        <HeaderTemplate>
            <div>
                <div><a href={movie.youtube_trailer_url} target="_blank"><img src={movie.poster_url} alt={movie.title} width="300px" height="400px"/></a></div>
                <div>
                    <div>
                        <span>제목</span>
                        <div>{movie.title}</div>
                    </div>
                    <div>
                        <span>줄거리</span>
                        <div>{movie.summary.slice(0, 230)}...</div>
                    </div>
                    <div>
                        <span>장르</span>
                        <ul>
                            {movie.genres.map((genre, i) => <li key={i}>{genre}</li>)}
                        </ul>
                    </div>
                    <div>감독 : {movie.director}</div>
                    <div>
                        <span>출연배우</span>
                        <ul>
                            {movie.actors.map((actor, i)=><li key={i}>{actor}</li>)}
                        </ul>
                    </div>
                    <div>평점 : {movie.rating}</div>
                    <div>상영시간 : {movie.runtime}</div>
                    <div>국가 : {movie.country}</div>
                    <div>
                        <div onClick={handleWishListToggle}><FontAwesomeIcon icon={isWished ? faHeartCircleCheck : faHeartCirclePlus} color={"red"} /></div>
                        <div onClick={handleCartListToggle}><FontAwesomeIcon icon={isAddedToCart ? faCartShopping : faCartPlus} color={"green"} /></div>
                    </div>
                </div>
                <Movies movies={similarMovies} />
            </div>
        </HeaderTemplate>
    )
}