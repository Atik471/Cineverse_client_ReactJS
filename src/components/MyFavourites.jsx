import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import FavouriteMovie from "./FavouriteMovie";

const MyFavourites = () => {
    const [favourites, setfavourites] = useState([])
    const [loading, setloading] = useState(true)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:5000/movies/favourites/${user.uid}`, {
            method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setfavourites(data)
            setloading(false)
        })
        .catch(error => console.log(error))
    }, [user])

    if(loading) <p>Loading...</p>
    return (
        <div>
            {
                favourites.map((favourite) => (
                    <FavouriteMovie key={favourite._id} movie={favourite} setfavourites={setfavourites}></FavouriteMovie>
                ))
            }
        </div>
    );
};

export default MyFavourites;