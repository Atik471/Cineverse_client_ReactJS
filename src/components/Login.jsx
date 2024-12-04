import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <form>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <Link to={"/forgot-password"}>Forgot Password?</Link>
                <Link to={"/register"}>Dont&apos;t have an account? Register</Link>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;