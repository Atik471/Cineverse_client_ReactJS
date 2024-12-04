import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const { setuser, createWithGoogle, signInWithEmail } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLoginWithGoogle = () => {
        createWithGoogle()
        .then((userCredential) => {
            setuser(userCredential.user)
            navigate("/")
            console.log(userCredential.user)
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        })
    }

    const handleLoginWithEmail = (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        signInWithEmail(email, password)
        .then((userCredential) => {
            setuser(userCredential.user)
            navigate("/")
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    return (
        <div>
            <form onSubmit={handleLoginWithEmail}>
                <input type="email" name="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="Password" />
                <Link to={`/forgot-password?email=${email}`}>Forgot Password?</Link>
                <Link to={"/register"}>Dont&apos;t have an account? Register</Link>
                <input type="submit" value="Login" />
            </form>
            <button onClick={handleLoginWithGoogle}>Login with Google</button>
        </div>
    );
};

export default Login;