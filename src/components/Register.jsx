import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import login_page from "../assets/login_page.png";

const Register = () => {
  const { setuser, createWithGoogle, createWithEmail } =
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

  const handeRegisterWithEmail = (e) => {
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
    createWithEmail(email, password, name, photoURL)
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

  return (
    <div className="flex w-[80%] mx-[10%] my-[5rem] justify-between">
      <div className="w-[50%] flex- flex-col">
        <h1 className="text-5xl font-bold mb-10">Register</h1>
        <form onSubmit={handeRegisterWithEmail} className="flex flex-col">
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            className="border-2 outline-none px-8 py-6 font-extralight text-xl mb-8"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="border-2 outline-none px-8 py-6 font-extralight text-xl mb-8"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 outline-none px-8 py-6 font-extralight text-xl mb-8"
          />
          <input
            required
            type="text"
            name="photoURL"
            placeholder="Paste your Photo URL here"
            className="border-2 outline-none px-8 py-6 font-extralight text-xl mb-8"
          />
          <p className="mb-8 ml-2">
            Already have an account?
            <Link
              to={"/login"}
              className="underline ml-2 font-medium decoration-transparent hover:decoration-primary transition-all duration-300 pb-3 underline-offset-8"
            >
              Login
            </Link>
          </p>

          <input
            type="submit"
            value="Register"
            className="px-8 py-6 font-bold text-xl mb-8 bg-primary text-white hover:bg-black cursor-pointer transition-all duration-300"
          />
        </form>
        <button
          onClick={handleLoginWithGoogle}
          className="w-full px-8 py-6 font-bold text-xl mb-8 bg-gray-500 text-white hover:bg-black cursor-pointer transition-all duration-300"
        >
          Register with Google
        </button>
      </div>
      <div
        className="flex-grow bg-no-repeat bg-contain w-[50%] ml-auto bg-center"
        style={{ backgroundImage: `url(${login_page})` }}
      ></div>
    </div>
  );
};

export default Register;
