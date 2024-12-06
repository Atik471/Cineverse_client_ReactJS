import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import login_page from "../assets/login_page.png";

const ForgotPass = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromLogin = params.get("email");
    if (emailFromLogin) {
      setEmail(emailFromLogin);
    }
  }, [location]);

  const goBackToLogin = () => {
    navigate("/login");
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    setEmail(e.target.email.value);

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[80vh] flex w-[80%] mx-[10%] my-[5rem] justify-between items-center">
      <div className="w-[50%] flex- flex-col">
        <form onSubmit={handleReset} className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={email}
            className="border-2 outline-none px-8 py-6 font-extralight text-xl mb-8"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="submit"
            value="Reset Password"
            className="px-8 py-6 font-bold text-xl mb-8 bg-primary text-white hover:bg-black cursor-pointer transition-all duration-300"
          />
          <button
            className="underline ml-2 font-medium decoration-transparent hover:decoration-primary transition-all duration-300 pb-3 underline-offset-8"
            onClick={goBackToLogin}
          >
            Go back to Login
          </button>
        </form>
      </div>
      <div
        className="h-full flex-grow bg-no-repeat bg-contain w-[50%] ml-auto bg-center"
        style={{ backgroundImage: `url(${login_page})` }}
      ></div>
    </div>
  );
};

export default ForgotPass;
