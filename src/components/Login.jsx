import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import login_page from "../assets/login_page.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("Invalid credential!");
  const [loading, setLoading] = useState(false);
  const { setuser, createWithGoogle, signInWithEmail } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginWithGoogle = () => {
    //setLoading(true)
    createWithGoogle()
      .then((userCredential) => {
        setuser(userCredential.user);
        navigate("/");
        toast.success("Login Succesful!", {
          position: "top-left",
          autoClose: 2000,
        });
        //console.log(userCredential.user);
        //setLoading(false)
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.success(`Login Failed! ${errorMessage}`, {
          position: "top-left",
          autoClose: 2000,
        });
        //setLoading(false)
      });
  };

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading(true);
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmail(email, password)
      .then((userCredential) => {
        setuser(userCredential.user);
        navigate("/");
        toast.success("Login Succesful!", {
          position: "top-left",
          autoClose: 2000,
        });
        setLoading(false);
      })
      .catch((err) => {
        const errorCode = err.code;
        console.log(err.code);
        switch (errorCode) {
          case "auth/invalid-credential":
            setError("Invalid credential!");
            break;
          default:
            setError("An unknown error occurred.");
            break;
        }
        toast.error(`Login Failed! ${error}`, {
          position: "top-left",
          autoClose: 2000,
        });
        setLoading(false);
      });
  };

  return (
    <div className="flex w-[90%] sm:w-[80%] mx-auto my-[3rem] sm:my-[4rem] lg:my-[5rem] justify-between">
      <div className="w-full sm:w-[50%] flex flex-col">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-10">Login</h1>
        <form onSubmit={handleLoginWithEmail} className="flex flex-col">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 outline-none px-6 sm:px-8 py-4 sm:py-6 font-extralight text-lg sm:text-xl mb-6 sm:mb-8"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 outline-none px-6 sm:px-8 py-4 sm:py-6 font-extralight text-lg sm:text-xl mb-6 sm:mb-8"
          />
          <div className="flex flex-col sm:flex-row mb-6 sm:justify-between">
            <Link
              to={`/forgot-password?email=${email}`}
              className="underline ml-2 font-medium decoration-transparent hover:decoration-primary transition-all duration-300 pb-3 underline-offset-8"
            >
              Forgot Password?
            </Link>
            <p className="md:pl-0 pl-2">
              Don&apos;t have an account?
              <Link
                to={"/register"}
                className="underline ml-2 font-medium decoration-transparent hover:decoration-primary transition-all duration-300 pb-3 underline-offset-8"
              >
                Register
              </Link>
            </p>
          </div>
          <div className="relative">
            <input
              required
              type="submit"
              value={`${loading ? "" : "Login"}`}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 font-bold text-lg sm:text-xl mb-8 bg-primary text-white hover:bg-black cursor-pointer transition-all duration-300"
            />
            {loading ? (
              <div className="absolute top-[20%] right-[50%] w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              ""
            )}
          </div>
        </form>
        <div className="relative border-b-2 mb-8">
          <p className="absolute left-1/2 -translate-y-1/2 bg-white px-2">or</p>
        </div>
        <button
          onClick={handleLoginWithGoogle}
          className="w-full px-6 sm:px-8 py-4 sm:py-6 font-bold text-lg sm:text-xl mb-8 bg-gray-500 text-white hover:bg-black cursor-pointer transition-all duration-300"
        >
          Login with Google
        </button>
      </div>
      <div
        className="hidden sm:block flex-grow bg-no-repeat bg-contain w-[50%] ml-auto bg-center"
        style={{ backgroundImage: `url(${login_page})` }}
      ></div>
    </div>
  );
};

export default Login;
