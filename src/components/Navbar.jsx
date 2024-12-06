import { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
// import logo from "../assets/cineverse_logo.png"
import { FaCirclePlay } from "react-icons/fa6";

const Navbar = () => {
    const [bgColor, setBgColor] = useState('bg-transparent');
    const [fontColor, setFontColor] = useState('text-white');
    const { user, setuser, logout } = useContext(AuthContext)

    useEffect(() => {
      const handleScroll = () => {
        const scrollThreshold = window.innerHeight * 0.6;
  
        if (window.scrollY > scrollThreshold) {
          setBgColor('bg-black');
          setFontColor('text-white');
        } else {
          setBgColor('bg-transparent');
          setFontColor('text-white');
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout()
        .then(() => {
            console.log("User signed out successfully.");
            setuser(null);
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
    }
    return (
        <div className={`w-full px-[4%] py-[1.5rem] flex justify-between fixed top-0 z-50 ${bgColor} transition-colors duration-1000 ${fontColor} font-bold text-lg items-center`}>
            <div className="w-14">
                <FaCirclePlay className="text-4xl"></FaCirclePlay>
            </div>
            <ul className="flex gap-8">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/all-movies"}>All Movies</NavLink>
                <NavLink to={"/add-movies"}>Add Movies</NavLink>
                <NavLink to={"my-favourites"}>My Favourites</NavLink>
            </ul>
            <div>
                {
                    user ? 
                    <button onClick={handleLogout}>Logout</button>
                    :
                    <button><Link to={"/login"}>Login</Link></button>
                }
            </div>
        </div>
    );
};

export default Navbar;