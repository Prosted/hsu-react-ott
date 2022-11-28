import { Link } from "react-router-dom"

export const Welcome = () => {
    return (
    <div>
        <h1>This is Welcome page</h1>
        <div>
            <Link to={"/login"}><div>Go to login</div></Link>
            <Link to={"/join"}><div>Create Account</div></Link>
        </div>
    </div>
    )
}