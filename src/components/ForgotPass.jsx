import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import login_page from "../assets/login_page.png";
import { toast } from "react-toastify";

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
      toast.success("Reset Email sent, Please check your email!", {
        position: "top-left",
        autoClose: 5000,
      });
    } catch (error) {
      console.log(`Error: ${error.message}`);
      toast.error(`Failed to send email, ${error.message}`, {
        position: "top-left",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto sm:h-auto flex w-[90%] sm:w-[80%] mx-auto my-[3rem] sm:my-[4rem] lg:my-[5rem] justify-between items-center">
      <div className="w-full sm:w-[50%] flex flex-col">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-10">Reset Password</h1>
        <form onSubmit={handleReset} className="flex flex-col">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={email}
            className="border-2 outline-none px-6 sm:px-8 py-4 sm:py-6 font-extralight text-lg sm:text-xl mb-6 sm:mb-8"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type="submit"
              value={`${loading ? "" : "Reset Password"}`}
              className="w-full px-6 sm:px-8 py-4 sm:py-6 font-bold text-lg sm:text-xl mb-8 bg-primary text-white hover:bg-black cursor-pointer transition-all duration-300"
            />
            {loading && (
              <div className="absolute top-[20%] right-[50%] w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
          <button
            className="underline ml-2 font-medium decoration-transparent hover:decoration-primary transition-all duration-300 pb-3 underline-offset-8"
            onClick={goBackToLogin}
          >
            Go back to Login
          </button>
        </form>
      </div>
      <div
        className="hidden sm:block h-full flex-grow bg-no-repeat bg-contain sm:w-[50%] ml-auto bg-center"
        style={{ backgroundImage: `url(${login_page})` }}
      ></div>
    </div>
  );
};

export default ForgotPass;
