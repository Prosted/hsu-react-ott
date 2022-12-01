import styles from "../styles/SimpleForm.module.css";

export const SimpleForm = ({handleId, handlePassword, handleSubmit, id, password, buttonText, errorPopup, errorMessage}) => {
    return(
        <form onSubmit={handleSubmit} className={styles.form}>
            <input className={styles.input} value={id} onChange={handleId} type="text" name="id" placeholder="Username" required maxLength="10"/>
            <input className={styles.input} value={password} onChange={handlePassword} type="password" name="password" placeholder="Password" required  maxLength="10"/>
            <button className={styles.button} type="submit">{buttonText}</button>
            <span className={styles.errorMessage}>{errorPopup ? errorMessage : ""}</span>
        </form>
    )
}