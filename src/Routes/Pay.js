import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

//Data
import { getCurrentUser } from "../Data/UserData";
import { getMovies } from "../Data/MovieDataController";
import { getCartMovieIdList, loadJSON, saveJSON } from "../Data/UserDBController";

//Component
import { HeaderTemplate } from "../Components/Template";

export const Pay = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const getCartMovies = () => {
        const {id} = getCurrentUser();
        const cartMovieIdList = getCartMovieIdList(id);
        const cartMovies = getMovies(cartMovieIdList);
        
        let totalPrice = 0;
        for(let i=0; i<cartMovies.length; i++)
        {
            totalPrice += cartMovies[i].price;
        }
        
        setTotalPrice(totalPrice);
        setMovies(cartMovies);
    }

    useEffect(()=>{
        getCartMovies();
    }, []);

    const handlePay = (event) => {
        const {id} = getCurrentUser();
        let userDB = loadJSON(id);
        
        //1. 목록 다 가져오기
        let wishlist = userDB.wishlist;
        let cartlist = userDB.cartlist;
        let purchaselist = userDB.purchaselist;

        //2. 구매내역에 추가, 찜 목록과 장바구니에서는 삭제
        for(let i=0; i<movies.length; i++)
        {
            const movie = movies[i];
            wishlist = wishlist.filter(id => movie.id != id);
            cartlist = cartlist.filter(id => movie.id != id);
            purchaselist.push(movie.id);
        }
        userDB.wishlist = wishlist;
        userDB.cartlist = cartlist;
        userDB.purchaselist = purchaselist;
        
        //3. 저장 및 홈으로 이동
        saveJSON(id, userDB);
        navigate("/");
    }


    if(movies.length == 0) return <HeaderTemplate><div>Nothing in Cart List</div></HeaderTemplate>
    if(movies)
    {
        return(
            <HeaderTemplate>
                <div>
                    <button onClick={()=>navigate("/")}>go to home</button>
                    <h1>This is pay page!</h1>
                    <div>
                        {movies.map(movie => 
                            <div key={movie.id}>
                                <img src={movie.poster_url} alt={movie.title} width="200" height="200" />
                                <span>{movie.title}</span>
                                <span>{movie.price}원</span>
                            </div>
                        )}
                    </div>
                    <div>
                        { 
                            <>
                                <div>총 개수 : {movies.length}</div>
                                <div>총 결제 금액 : {totalPrice}원</div>
                                <div onClick={handlePay}>결제하기</div>
                            </>
                        }
                    </div>
                </div>
            </HeaderTemplate>
        )
    }
}