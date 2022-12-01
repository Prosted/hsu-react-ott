import styled from "styled-components";

export default function MovieCardForPay({ movieData }) {
  const { id, poster_url, title, price, runtime, flim_rating, release_date, genres } = movieData;

  return (
    <tr key={id}>
      <TableDiv>
        <MovieImg src={poster_url} />
      </TableDiv>
      <TableDiv>
        <TextWrapper>
          <div>
            <Title>{title}</Title>
            <p>{runtime}분</p>
            <p>{flim_rating}세 이상 관람가</p>
            <p>{release_date.slice(0, 4)}년</p>
          </div>
        </TextWrapper>
      </TableDiv>
      <TableDiv>
        <Description>₩{price.toLocaleString("en")}</Description>
      </TableDiv>
      <TableDiv>
        <Description>{genres.join("/")}</Description>
      </TableDiv>
      <TableDiv>
        <DeleteButton>삭제</DeleteButton>
      </TableDiv>
    </tr>
  );
}

const DeleteButton = styled.button`
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
  background-color: #d7d4d4;
  border-radius: 6px;
  padding: 2px 13px;
  margin-left: 55px;
  font-size: 17px;
`;
const TextWrapper = styled.div`
  margin-top: 20px;
  line-height: 30px;
  font-size: 20px;
  color: #d5d4d4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.p`
  font-weight: 800;
  color: white;
`;

const Description = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const TableDiv = styled.td`
  vertical-align: middle;
  font-size: 20px;
`;
const MovieImg = styled.img`
  margin-top: 23px;
  margin-bottom: 5px;
  width: 140px;
  height: auto;
  margin-left: 60px;
`;
