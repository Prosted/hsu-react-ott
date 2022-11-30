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

//styles
import styles from "../styles/MovieDetail.module.css";

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
            <div className={styles.detail_page}>
                <div className={styles.detail_info}>
                    <div>
                        <h1>{movie.title}</h1>
                    </div>
                    <div><b>가격:</b> {movie.price}원</div>
                    <div>
                        <span><b>장르</b></span>
                        <ul>
                            {movie.genres.map((genre, i) => <li key={i}>{genre}</li>)}
                        </ul>
                    </div>
                    <div><b>감독 :</b> {movie.director}</div>
                    <div>
                        <span><b>출연배우</b></span>
                        <ul>
                            {movie.actors.map((actor, i)=><li key={i}>{actor}</li>)}
                        </ul>
                    </div>
                    <div><b>평점 :</b> {movie.rating}</div>
                    <div><b>등급 :</b> {movie.flim_rating}</div>
                    <div><b>배급사 :</b> {movie.distributor}</div>
                    <div><b>개봉날짜 :</b> {movie.release_date}</div>
                    <div><b>상영시간 :</b> {movie.runtime}분</div>
                    <div><b>국가 :</b> {movie.country}</div>
                    <div>
                    <div style={{float:"left"}} className={styles.icon} onClick={handleWishListToggle}><FontAwesomeIcon icon={isWished ? faHeartCircleCheck : faHeartCirclePlus} color={"red"} /></div>
                    <div style={{float:"left"}} className={styles.icon} onClick={handleCartListToggle}><FontAwesomeIcon icon={isAddedToCart ? faCartShopping : faCartPlus} color={"green"} /></div>
                    </div>
                </div>
                <div className={styles.posterImg}><a href={movie.youtube_trailer_url} target="_blank"><img src={movie.poster_url} alt={movie.title} width="300px" /></a></div>
                </div>
                <div className={styles.detail_page}>
                <div className={styles.plot_div}>
                        <span><b>줄거리</b></span>
                        <div>{movie.summary}</div>
                 </div>
                </div>
                <div className={styles.detail_page}>
                <div style={{float:"left"}}>
                    <div className={styles.categoryTitle}>이런 영화들은 어떠신가요?</div>
                    <Movies movies={similarMovies} />
                </div>
            </div>
        </HeaderTemplate>
    )
}