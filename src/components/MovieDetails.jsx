import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { LocationContext } from "../providers/LocationProvider";

const MovieDetails = () => {
    const [movie, setmovie] = useState(null)
    const [loading, setloading] = useState(true)
    const param = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const {serverDomain} = useContext(LocationContext)

    useEffect(() => {
        fetch(`${serverDomain}/movies/${param.id}`)
        .then((res) => res.json())
        .then((data) => {
            setmovie(data);
            setloading(false);
        })
        .catch((error) => console.log(error))
    }, [param])

    if(loading) return <p>Loading...</p>

    console.log(movie)
    const handledelete = async() => {
        await fetch(`${serverDomain}/movies/${param.id}`, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(result => console.log(result))
        .catch(error => console.log(error))

        navigate('/all-movies')
    }

    const handleAddtoFavourites = async() => {
        await fetch(`${serverDomain}/movies/add-favourite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user.uid,
                poster: movie.poster,
                title: movie.title,
                genre: movie.genre,
                duration: movie.duration,
                releaseYear: movie.releaseYear,
                rating: movie.rating,
                summary: movie.summary,
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    return (
        <div>
            <button className="bg-slate-500" onClick={handleAddtoFavourites}>Add to favourites</button>
            <button className="bg-slate-800 text-white" onClick={handledelete}>Delete</button>
            <img src={movie.poster} alt="poster" />
        </div>
    );
};

export default MovieDetails;