import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetails = () => {
    const [movie, setmovie] = useState(null)
    const [loading, setloading] = useState(true)
    const param = useParams()
    const navigate = useNavigate()

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

    const handledelete = async() => {
        await fetch(`http://localhost:5000/movies/${param.id}`, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(result => console.log(result))
        .catch(error => console.log(error))

        navigate('/all-movies')
    }

    return (
        <div>
            <button className="bg-slate-500">Add to favourites</button>
            <button className="bg-slate-800 text-white" onClick={handledelete}>Delete</button>
            <img src={movie.poster} alt="poster" />
        </div>
    );
};

export default MovieDetails;