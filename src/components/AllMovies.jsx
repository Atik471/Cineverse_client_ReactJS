import { useContext, useEffect, useState } from "react";
import Movie from "./Movie";
import { LocationContext } from "../providers/LocationProvider";

const AllMovies = () => {
    const [movies, setmovies] = useState([])
    const [loading, useloading] = useState(true)
    const {serverDomain} = useContext(LocationContext)

    useEffect(() => {
        fetch(`${serverDomain}/movies`)
        .then((res) => res.json())
        .then((data) => {
            setmovies(data)
            useloading(false)
        })
        .catch((error) => console.log(error))
    }, [])

    if(loading) return <p>Loading...</p>

    return (
        <div>
            {
                movies.map((movie) => (
                    <Movie key={movie._id} movie={movie}></Movie>
                ))
            }
        </div>
    );
};

export default AllMovies;

