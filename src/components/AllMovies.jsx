import { useEffect, useState } from "react";
import Movie from "./Movie";

const AllMovies = () => {
    const [movies, setmovies] = useState([])
    const [loading, useloading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:5000/movies")
        .then((res) => res.json())
        .then((data) => {
            setmovies(data)
            useloading(false)
        })
        .catch((error) => console.log(error))
    }, [])

    if(loading) return <p>Loading...</p>

    console.log(movies[0])

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

