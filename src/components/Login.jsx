import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import login_page from "../assets/login_page.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const { setuser, createWithGoogle, signInWithEmail } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginWithGoogle = () => {
    createWithGoogle()
      .then((userCredential) => {
        setuser(userCredential.user);
        navigate("/");
        console.log(userCredential.user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    signInWithEmail(email, password)
      .then((userCredential) => {
        setuser(userCredential.user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="flex w-[80%] mx-[10%] my-[5rem] justify-between">
      <div className="w-[50%] flex- flex-col">
        <h1 className="text-5xl font-bold mb-10">Login</h1>
        <form onSubmit={handleLoginWithEmail} className="flex flex-col">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 outline-none px-8 py-6 font-extralight text-xl mb-8"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 outline-none px-8 py-6 font-extralight text-xl mb-8"
          />
          <div className="flex mb-6 justify-between">
            <Link
              to={`/forgot-password?email=${email}`}
              className="underline ml-2 font-medium decoration-transparent hover:decoration-primary transition-all duration-300 pb-3 underline-offset-8"
            >
              Forgot Password?
            </Link>
            <p>Dont&apos;t have an account? 
            <Link to={"/register"}
            className="underline ml-2 font-medium decoration-transparent hover:decoration-primary transition-all duration-300 pb-3 underline-offset-8">Register</Link>
            </p>
          </div>
          <input
            required
            type="submit"
            value="Login"
            className="px-8 py-6 font-bold text-xl mb-8 bg-primary text-white hover:bg-black cursor-pointer transition-all duration-300"
          />
        </form>
        <div className="relative border-b-2 mb-8">
          <p className="absolute left-1/2 -translate-y-1/2 bg-white px-2">or</p>
        </div>
        <button onClick={handleLoginWithGoogle}
        className="w-full px-8 py-6 font-bold text-xl mb-8 bg-gray-500 text-white hover:bg-black cursor-pointer transition-all duration-300">Login with Google</button>
      </div>
      <div
        className="flex-grow bg-no-repeat bg-contain w-[50%] ml-auto bg-center"
        style={{ backgroundImage: `url(${login_page})` }}
      ></div>
    </div>
  );
};

export default Login;
