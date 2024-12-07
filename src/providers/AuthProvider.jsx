import PropTypes from "prop-types";
import { createContext, useEffect } from "react";
import { useState } from "react";
import auth from "../../firebase.init"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            if(currentuser) setuser(currentuser)
            setLoading(false);
        })

        return () => unsubscribe()
    }, [])

    const googleProvider = new GoogleAuthProvider();

    const createWithGoogle = async () => {
        googleProvider.setCustomParameters({
            prompt: "select_account",
          });
    
          const result = await signInWithPopup(auth, googleProvider);
        return result
    }

    const createWithEmail = async (email, password, displayName, photoURL) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
        await updateProfile(userCredential.user, {
          displayName: displayName,
          photoURL: photoURL,
        });

        return userCredential
    }

    const signInWithEmail = (email, password) => {
        return  signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth)
    }


    const authinfo = {
        user,
        setuser,
        createWithGoogle,
        createWithEmail,
        signInWithEmail,
        logout,
        loading
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
              <div className="relative">
                <div className="w-28 h-28 border-8 border-primary border-solid rounded-full animate-spin border-t-transparent"></div>
                <p className="absolute inset-0 flex items-center justify-center text-primary font-semibold text-xl">
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