import { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaCirclePlay } from "react-icons/fa6";

const Navbar = () => {
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [fontColor, setFontColor] = useState("text-white");
  const { user, setuser, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.5;

      if (window.scrollY > scrollThreshold) {
        setBgColor("bg-black");
        setFontColor("text-white");
      } else {
        setBgColor("bg-transparent");
        setFontColor("text-white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
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
  };
  if (user) console.log(user.photoURL);

  return (
    <div
      className={`w-full px-[4%] py-[1.5rem] flex justify-between fixed top-0 z-50 ${bgColor} transition-colors duration-1000 ${fontColor} font-bold text-lg items-center`}
    >
      <div className="w-14">
        <Link to={'/'}><FaCirclePlay className="text-5xl text-primary"></FaCirclePlay></Link>
      </div>
      <ul className="flex gap-8">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/all-movies"}>All Movies</NavLink>
        <NavLink to={"/add-movies"}>Add Movies</NavLink>
        <NavLink to={"my-favourites"}>My Favourites</NavLink>
      </ul>
      <div>
        {user ? (
          <div className="flex gap-6">
            <button onClick={handleLogout}>Logout</button>
            <div className="relative group w-10 h-10">
              <div
                className={`rounded-full w-10 h-10 p-[2px] border-2 border-gray-600 bg-contain`}
                style={{
                  backgroundImage: `url(${
                    user.photoURL || "../assets/login_page.png"
                  })`,
                }}
              ></div>
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {(user?.displayName || "Guest User").split(" ")[0]}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button>
              <Link to={"/login"}>Login</Link>
            </button>
            <button>
              <Link to={"/register"}>Register</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
