import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MyFavourites = () => {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:5000/movies/favourites/${user.uid}`, {
            method: 'GET'})
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }, [user])

    return (
        <div>
            
        </div>
    );
};

export default MyFavourites;