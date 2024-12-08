import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import login_page from "/assets/login_page.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user, setuser, createWithGoogle, createWithEmail } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Navigate after user state is updated
      navigate("/");
    }
  }, [user, navigate]);

  const handleLoginWithGoogle = () => {
    createWithGoogle()
      .then((userCredential) => {
        setuser(userCredential.user);
        navigate("/");
        console.log(userCredential.user);
      })
      .catch((err) => {
        const errorMessage = err.message;
        console.log(errorMessage);
      });
  };

  const handeRegisterWithEmail = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photoURL = form.photoURL.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createWithEmail(
        email,
        password,
        name,
        photoURL
      );
      console.log(userCredential.user);
      setuser(userCredential.user);
      toast.success("Registration Successful!", {
        position: "top-left",
        autoClose: 2000,
      });

      //navigate("/");
    } catch (err) {
      const errorCode = err.code;
      console.log(err.code);
      let errorMessage;

      switch (errorCode) {
        case "auth/email-already-in-use":
          errorMessage =
            "This email is already in use. Please try a different one.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format. Please check your email.";
          break;
        case "auth/weak-password":
          errorMessage =
            "Password is too weak. Please choose a stronger password.";
          break;
        default:
          errorMessage = "An unknown error occurred during sign-up.";
          break;
      }

      setError(errorMessage);
      toast.error(`Sign up Failed! ${error || errorMessage}`, {
        position: "top-left",
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex w-[90%] sm:w-[80%] mx-auto my-[3rem] sm:my-[4rem] lg:my-[5rem] justify-between">
      <div className="w-full sm:w-[50%] flex flex-col">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-10">
          Register
        </h1>
        <form onSubmit={handeRegisterWithEmail} className="flex flex-col">
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            className="border-2 outline-none px-6 sm:px-8 py-4 sm:py-6 font-extralight text-lg sm:text-xl mb-6 sm:mb-8"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="border-2 outline-none px-6 sm:px-8 py-4 sm:py-6 font-extralight text-lg sm:text-xl mb-6 sm:mb-8"
          />
          <div className="relative mb-6 sm:mb-8">
            <input
              required
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="border-2 outline-none px-6 sm:px-8 py-4 sm:py-6 font-extralight text-lg sm:text-xl w-full"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
            >
              {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <input
            type="text"
            name="photoURL"
            placeholder="Paste your Photo URL here"
            className="border-2 outline-none px-6 sm:px-8 py-4 sm:py-6 font-extralight text-lg sm:text-xl mb-6 sm:mb-8"
          />
          <p className="mb-6 sm:mb-8 ml-2">
            Already have an account?
            <Link
              to={"/login"}
              className="underline ml-2 font-medium decoration-transparent hover:decoration-primary transition-all duration-300 pb-3 underline-offset-8"
            >
              Login
            </Link>
          </p>

          <div className="relative">
            <input
              type="submit"
              value={`${loading ? "" : "Register"}`}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 font-bold text-lg sm:text-xl mb-8 bg-primary text-white hover:bg-black cursor-pointer transition-all duration-300"
            />
            {loading ? (
              <div className="absolute top-[20%] right-[50%] w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              ""
            )}
          </div>
        </form>
        <button
          onClick={handleLoginWithGoogle}
          className="w-full px-6 sm:px-8 py-4 sm:py-6 font-bold text-lg sm:text-xl mb-8 bg-gray-500 text-white hover:bg-black cursor-pointer transition-all duration-300"
        >
          Register with Google
        </button>
      </div>
      <div
        className="hidden sm:block flex-grow bg-no-repeat bg-contain w-[50%] ml-auto bg-center"
        style={{ backgroundImage: `url(${login_page})` }}
      ></div>
    </div>
  );
};

export default Register;
