import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const ForgotPass = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const emailFromLogin = params.get('email');
      if (emailFromLogin) {
        setEmail(emailFromLogin); 
      }
    }, [location]);

    const goBackToLogin = () => {
      navigate('/login'); 
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);

        setEmail(e.target.email.value);

        try {
          await sendPasswordResetEmail(auth, email)
          console.log(email)
        } catch (error) {
          console.log(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
      };

    return (
        <div>
            <form onSubmit={handleReset}>
                <input type="email" name="email" placeholder="Email" defaultValue={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <button onClick={goBackToLogin}>Go back to Login</button>
                <input type="submit" value="Reset Password" className="bg-slate-400"/>
            </form>
        </div>
    );
};

export default ForgotPass;