import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Data
import { getCurrentUser } from "../Data/UserData";
import { getMovies } from "../Data/MovieDataController";
import { getCartMovieIdList, loadJSON, saveJSON } from "../Data/UserDBController";

//Component
import { HeaderTemplate } from "../Components/Template";
import MovieCardForPay from "../Components/movieCardForPay";
import styled from "styled-components";

export const Pay = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(movies);
  const getCartMovies = () => {
    const { id } = getCurrentUser();
    const cartMovieIdList = getCartMovieIdList(id);
    const cartMovies = getMovies(cartMovieIdList);

    let totalPrice = 0;
    for (let i = 0; i < cartMovies.length; i++) {
      totalPrice += cartMovies[i].price;
    }

    setTotalPrice(totalPrice);
    setMovies(cartMovies);
  };

  useEffect(() => {
    getCartMovies();
  }, []);

  const handlePay = (event) => {
    const { id } = getCurrentUser();
    let userDB = loadJSON(id);

    //1. 목록 다 가져오기
    let wishlist = userDB.wishlist;
    let cartlist = userDB.cartlist;
    let purchaselist = userDB.purchaselist;

    //2. 구매내역에 추가, 찜 목록과 장바구니에서는 삭제
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      wishlist = wishlist.filter((id) => movie.id != id);
      cartlist = cartlist.filter((id) => movie.id != id);
      purchaselist.push(movie.id);
    }
    userDB.wishlist = wishlist;
    userDB.cartlist = cartlist;
    userDB.purchaselist = purchaselist;

    //3. 저장 및 홈으로 이동
    saveJSON(id, userDB);
    navigate("/");
  };

  if (movies.length == 0)
    return (
      <HeaderTemplate>
        <div>Nothing in Cart List</div>
      </HeaderTemplate>
    );
  if (movies) {
    return (
      <HeaderTemplate>
        <BodyWrapper>
          <Title>Check your Pay List</Title>
          <ListWrapper>
            <colgroup>
              <Col width={"20%"} />
              <Col width={"20%"} />
              <Col width={"20%"} />
              <Col width={"20%"} />
              <Col width={"20%"} />
            </colgroup>
            <Description>
              <TableRow>
                <HeadContent></HeadContent>
                <HeadContent>상품정보</HeadContent>
                <HeadContent>상품금액</HeadContent>
                <HeadContent>장르</HeadContent>
                <HeadContent></HeadContent>
              </TableRow>
            </Description>
            <TableBody>
              {movies.map((movie) => (
                <MovieCardForPay movieData={movie} />
              ))}
            </TableBody>
          </ListWrapper>
          <TotalPriceWrapper>
            <Text>총 결제 금액 &nbsp;</Text>
            <TotalPrice>{totalPrice.toLocaleString("en")}</TotalPrice>
            <Text>&nbsp;원</Text>
          </TotalPriceWrapper>
          <ButtonWrapper>
            <PayButton onClick={handlePay}>결제하기</PayButton>
          </ButtonWrapper>
        </BodyWrapper>
      </HeaderTemplate>
    );
  }
};
const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: center;
`;
const PayButton = styled.div`
  padding: 0.7rem 0.7rem;
  border-radius: 0.5rem;
  background-color: #2e9afc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  font-size: 20px;
  cursor: pointer;
  :hover {
    transform: scale(1.02);
  }
`;
const TotalPrice = styled.p`
  font-size: 25px;
`;
const Text = styled.p`
  font-size: 20px;
`;
const TotalPriceWrapper = styled.div`
  margin-top: 15px;
  font-size: 24px;

  border-top: 4px solid grey;
  padding: 10px 0 10px 0;
  border-bottom: 4px solid grey;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 15px;
`;
const TableRow = styled.tr`
  height: 40px;
`;
const TableBody = styled.tbody``;
const Col = styled.col`
  width: ${(props) => props.width};
`;
const HeadContent = styled.th`
  font-size: 22px;
`;

const ListWrapper = styled.table`
  width: 100%;
`;

const Description = styled.thead`
  border-bottom: 3px solid #ff7373;
`;

const BodyWrapper = styled.div`
  padding: 20px 20px;
`;
const Title = styled.h1`
  font-size: 33px;
  margin-top: 10px;
  padding-bottom: 20px;
  width: 100%;
  border-bottom: 6px solid #ff7373;
  margin-bottom: 15px;
`;
