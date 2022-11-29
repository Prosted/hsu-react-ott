import { Link } from "react-router-dom"

export const Welcome = () => {
    return (
    <div>
        <h1>NETFLIX</h1>
        <div>
            <div><Link to={"/login"}>Login</Link></div>
            <div><Link to={"/join"}>Create Account</Link></div>
        </div>
    </div>
    )
}