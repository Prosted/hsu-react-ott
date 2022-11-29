import { useNavigate, Link } from "react-router-dom";

//Data
import { getCurrentUser } from "../Data/UserData";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
    const {id} = getCurrentUser();
    const navigate = useNavigate();
    return(
        <div>
            <div><Link to={"/"}>NETFLIX</Link></div>
            <div><Link to={"/wishlist"}>Wish List</Link></div>
            <div><Link to={"/cartlist"}>Cart List</Link></div>
            <div><Link to={"/search"}><FontAwesomeIcon icon={faMagnifyingGlass} color={"black"} /></Link></div>
            <div><Link to={`/${id}/movies`}>My Movies</Link></div>
            <div><Link to={"/logout"}>Logout</Link></div>
        </div>
    );
}