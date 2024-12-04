import { Link } from "react-router-dom";

const ForgortPass = () => {
    return (
        <div>
            <form>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <Link to={"/login"}>Go Back</Link>
                <input type="submit" value="Reset Password" />
            </form>
        </div>
    );
};

export default ForgortPass;