import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <ul>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/all-movies"}>All Movies</NavLink>
                <NavLink to={"/add-movies"}>Add Movies</NavLink>
                <NavLink to={"my-favourites"}>My Favourites</NavLink>
            </ul>
            <Link to={"/login"}>Login</Link>
        </div>
    );
};

export default Navbar;