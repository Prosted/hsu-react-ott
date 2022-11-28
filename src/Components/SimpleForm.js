export const SimpleForm = ({handleId, handlePassword, handleSubmit, id, password, buttonText, errorPopup, errorMessage}) => {
    return(
        <form onSubmit={handleSubmit}>
            <input value={id} onChange={handleId} type="text" name="id" placeholder="Username" required />
            <input value={password} onChange={handlePassword} type="password" name="password" placeholder="Password" required />
            <button type="submit">{buttonText}</button>
            <h3>{errorPopup ? errorMessage : ""}</h3>
        </form>
    )
}