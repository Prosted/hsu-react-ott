import { useNavigate, Link } from "react-router-dom";

//Data
import { getCurrentUser } from "../Data/UserData";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

//Styles
import styles from "../styles/Header.module.css";

export const Header = () => {
    const {id} = getCurrentUser();
    const navigate = useNavigate();
    return(
        <div className={styles.bar}>
            <div className={`${styles.logo} ${styles.logo2}`}><Link className={styles.logo} to={"/"}>NETFLIX</Link></div>
            <div className={styles.linkBox}><Link className={styles.link} to={"/wishlist"}>Wish List</Link></div>
            <div className={styles.linkBox}><Link className={styles.link} to={"/cartlist"}>Cart List</Link></div>
            <div className={styles.linkBox}><Link className={styles.link} to={"/search"}><FontAwesomeIcon icon={faMagnifyingGlass} /></Link></div>
            <div className={styles.linkBox}><Link className={styles.link} to={`/${id}/movies`}>My Movies</Link></div>
            <div className={styles.linkBox}><Link className={styles.link} to={"/logout"}>Logout</Link></div>
        </div>
    );
}