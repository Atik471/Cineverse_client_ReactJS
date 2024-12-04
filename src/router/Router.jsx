import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import ErrorPage from "../components/ErrorPage"
import Login from "../components/Login"
import Register from "../components/Register"
import ForgotPass from "../components/ForgortPass"
import AllMovies from "../components/AllMovies"
import AddMovies from "../components/AddMovies"
import MyFavourites from "../components/MyFavourites"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "forgotpass",
                element: <ForgotPass></ForgotPass>
            },
            {
                path: "all-movies",
                element: <AllMovies></AllMovies>
            },
            {
                path: "add-movies",
                element: <AddMovies></AddMovies>
            },
            {
                path: "my-favourites",
                element: <MyFavourites></MyFavourites>
            }
        ]
    }
])

export default router;