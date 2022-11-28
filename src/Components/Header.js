import { useNavigate, Link } from "react-router-dom";

//Data
import { getCurrentUser } from "../Data/UserData";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart, faCartArrowDown, faRightFromBracket, faAddressCard } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
    const {id} = getCurrentUser();
    const navigate = useNavigate();
    return(
        <div>
            <Link to={"/"}><h1>NETFLIX</h1></Link>
            <Link to={"/wishlist"}><FontAwesomeIcon icon={faHeart} color={"red"} fontSize="30px" /></Link>
            <Link to={"/cartlist"}><FontAwesomeIcon icon={faCartArrowDown} color={"green"} fontSize="30px" /></Link>
            <Link to={"/search"}><FontAwesomeIcon icon={faMagnifyingGlass} color={"cion"} fontSize="30px" /></Link>
            <Link to={`/${id}/movies`}><FontAwesomeIcon icon={faAddressCard} color={"salmon"} fontSize="30px" /></Link>
            <Link to={"/logout"}><FontAwesomeIcon icon={faRightFromBracket} color={"tomato"} fontSize="30px" /></Link>
        </div>
    );
}