import PropTypes from "prop-types";
import { createContext, useEffect } from "react";
import { useState } from "react";
import auth from "../../firebase.init"
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            if(currentuser) setuser(currentuser)
        })

        return () => unsubscribe()
    }, [])

    const googleProvider = new GoogleAuthProvider();

    


    const authinfo = []

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-blue-600 border-solid rounded-full animate-spin border-t-transparent"></div>
                <p className="absolute inset-0 flex items-center justify-center text-primary font-semibold">
                  Loading...
                </p>
              </div>
            </div>
          );
    }


    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.object,
}

export default AuthProvider;