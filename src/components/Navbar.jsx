import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
    const { user, setuser, logout } = useContext(AuthContext)

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
        <div>
            <ul>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/all-movies"}>All Movies</NavLink>
                <NavLink to={"/add-movies"}>Add Movies</NavLink>
                <NavLink to={"my-favourites"}>My Favourites</NavLink>
            </ul>
            {
                user ? 
                <button onClick={handleLogout}>Logout</button>
                :
                <button><Link to={"/login"}>Login</Link></button>
            }
            
        </div>
    );
};

export default Navbar;