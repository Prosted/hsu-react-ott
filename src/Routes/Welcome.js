import { Link } from "react-router-dom"
import styles from "../styles/Welcome.module.css";

export const Welcome = () => {
    return (
    <div className={styles.background}>
        <h1 className={styles.logoTitle}>NETFLIX</h1>
        <div className={styles.btnGroup}>
            <div className={styles.btn}><Link to={"/login"} className={styles.btnText}>Login</Link></div>
            <div className={styles.btn}><Link to={"/join"} className={styles.btnText}>Create Account</Link></div>
        </div>
    </div>
    )
}