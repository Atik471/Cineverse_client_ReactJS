import { NavLink } from "react-router-dom";
import Login from "./Login";

const Navbar = () => {
    return (
        <div>
            <ul>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/all-movies"}>All Movies</NavLink>
                <NavLink to={"/add-movies"}>Add Movies</NavLink>
                <NavLink to={"my-favourites"}>My Favourites</NavLink>
            </ul>
            <Login to={"/login"}>Login</Login>
        </div>
    );
};

export default Navbar;