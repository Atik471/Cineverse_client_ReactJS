import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
    const [movie, setmovie] = useState(null)
    const [loading, setloading] = useState(true)
    const param = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/movies/${param.id}`)
        .then((res) => res.json())
        .then((data) => {
            setmovie(data);
            setloading(false);
        })
        .catch((error) => console.log(error))
    }, [param])

    if(loading) return <p>Loading...</p>

    return (
        <div>
            <img src={movie.poster} alt="poster" />
        </div>
    );
};

export default MovieDetails;