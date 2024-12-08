import { useContext, useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaBars, FaCirclePlay } from "react-icons/fa6";
import { GiNightSky } from "react-icons/gi";
import { ThemeContext } from "../providers/ThemeProvider";
import { FaRegSun } from "react-icons/fa6";

const Navbar = () => {
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [fontColor, setFontColor] = useState("text-white");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setuser, logout } = useContext(AuthContext);
  const location = useLocation();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleTheme = () => {
    if(theme === 'light') setTheme('dark')
    else setTheme('light')
  }

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

  return (
    <div
      className={`w-full px-[4%] py-4 md:py-[1.5rem] flex justify-between fixed top-0 z-50 ${bgColor} transition-colors duration-1000 ${fontColor} font-bold text-lg items-center`}
    >
      <div className="w-14">
        <Link to={"/"}>
          <FaCirclePlay className="text-5xl text-primary"></FaCirclePlay>
        </Link>
      </div>
      <ul className="gap-8 md:flex hidden">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/all-movies"}>All Movies</NavLink>
        <NavLink to={"/add-movies"}>Add Movies</NavLink>
        <NavLink to={"my-favourites"}>My Favourites</NavLink>
        <NavLink to={"/contact-us"}>Contact Us</NavLink>
      </ul>
      <div>
        {user ? (
          <div className="flex gap-6 items-center">
            {
              location.pathname === '/' && theme === 'light' ? <GiNightSky  className=" bg-primary cursor-pointer rounded-xl px-2 py-1 w-10 h-10" onClick={handleTheme}></GiNightSky> : <FaRegSun  className=" bg-primary cursor-pointer rounded-xl px-2 py-1 w-10 h-10" onClick={handleTheme}></FaRegSun>
            }
            <button
              onClick={handleLogout}
              className="bg-primary px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-lg hover:bg-orange-500 transition-all duration-500 text-sm md:text-base"
            >
              Logout
            </button>
            <div className="relative group md:w-10 h-8 w-8 md:h-10">
              <div
                className={`rounded-full md:w-10 h-8 w-8 md:h-10 p-[2px] border-2 border-gray-600 bg-contain`}
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
          <div className="flex gap-3">
            <button className="bg-primary px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-lg hover:bg-orange-500 transition-all duration-500 text-sm md:text-base">
              <Link to={"/login"}>Login</Link>
            </button>
            <button className="bg-primary px-2 md:px-4 py-1 md:py-2 rounded-md md:rounded-lg hover:bg-orange-500 transition-all duration-500 text-sm md:text-base">
              <Link to={"/register"}>Register</Link>
            </button>
            
          </div>
        )}
      </div>
      <div className="block md:hidden">
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars className="text-2xl" />
          </button>
        </div>

        <ul
          className={`lg:hidden ${
            isMenuOpen
              ? "flex-col absolute top-16 left-1/2 transform -translate-x-1/2 bg-black p-6 rounded-md w-4/5"
              : "hidden"
          }`}
        >
          <li>
            <NavLink to={"/"} onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/all-movies"} onClick={() => setIsMenuOpen(false)}>
              All Movies
            </NavLink>
          </li>
          <li>
            <NavLink to={"/add-movies"} onClick={() => setIsMenuOpen(false)}>
              Add Movies
            </NavLink>
          </li>
          <li>
            <NavLink to={"/my-favourites"} onClick={() => setIsMenuOpen(false)}>
              My Favourites
            </NavLink>
          </li>
          <li>
            <NavLink to={"/contact-us"}>Contact Us</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
