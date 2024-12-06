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
        <div className="w-[80%] mx-[10%] my-[5rem]">
            <div className="mb-12">
                <p className="text-lg font-semibold text-black/70">Explore our most popular movies</p>
                <h1 className="text-[3.5rem] font-bold text-black">Movies For You</h1>
            </div>
            <div className="grid grid-cols-3 gap-8">
            {
                movies.map((movie) => (
                    <Movie key={movie._id} movie={movie}></Movie>
                ))
            }
            </div>
        </div>
    );
};

export default AllMovies;

