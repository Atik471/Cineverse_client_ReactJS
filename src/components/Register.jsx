import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {

    const { setuser, createWithGoogle, createWithEmail } = useContext(AuthContext)
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

    const handeRegisterWithEmail = (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const photoURL = form.photoURL.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return; 
        }
        createWithEmail(email, password, name, photoURL)
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

    return (
        <div>
            <form onSubmit={handeRegisterWithEmail}>
                <input type="text" name="name" placeholder="Name"/>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <input type="text" name="photoURL" placeholder="Paste your Photo URL here" />
                <Link to={"/login"}>Already have an account? Login</Link>
                <input type="submit" value="Register" />
            </form>
            <button onClick={handleLoginWithGoogle}>Register with Google</button>
        </div>
    );
};

export default Register;