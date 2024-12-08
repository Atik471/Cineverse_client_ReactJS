import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import ErrorPage from "../components/ErrorPage"
import Login from "../components/Login"
import Register from "../components/Register"
import ForgotPass from "../components/ForgotPass"
import AllMovies from "../components/AllMovies"
import AddMovies from "../components/AddMovies"
import MyFavourites from "../components/MyFavourites"
import PrivateRoute from "./PrivateRoute"
import MovieDetails from "../components/MovieDetails";
import Home from "../components/Home";
import ContactUs from "../components/ContactUs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "forgot-password",
                element: <ForgotPass></ForgotPass>
            },
            {
                path: "all-movies",
                element: <AllMovies></AllMovies>
            },
            {
                path: "add-movies",
                element: 
                <PrivateRoute>
                    <AddMovies></AddMovies>
                </PrivateRoute>
            },
            {
                path: "my-favourites",
                element:
                <PrivateRoute>
                    <MyFavourites></MyFavourites>
                </PrivateRoute>
            },
            {
                path: "movie-details/:id",
                element: 
                <PrivateRoute>
                    <MovieDetails></MovieDetails>
                </PrivateRoute>
            },
            {
                path: "contact-us",
                element: <ContactUs></ContactUs>
            }
        ]
    }
])

export default router;