import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { LocationContext } from "../providers/LocationProvider";
import { Rating } from "react-simple-star-rating";

const MovieDetails = () => {
  const [movie, setmovie] = useState(null);
  const [loading, setloading] = useState(true);
  const param = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { serverDomain } = useContext(LocationContext);

  useEffect(() => {
    fetch(`${serverDomain}/movies/${param.id}`)
      .then((res) => res.json())
      .then((data) => {
        setmovie(data);
        setloading(false);
      })
      .catch((error) => console.log(error));
  }, [param]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <div className="w-28 h-28 border-8 border-primary border-solid rounded-full animate-spin border-t-transparent"></div>
          <p className="absolute inset-0 flex items-center justify-center text-primary font-semibold text-xl">
            Loading...
          </p>
        </div>
      </div>
    );

  console.log(movie);
  const handledelete = async () => {
    await fetch(`${serverDomain}/movies/${param.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    navigate("/all-movies");
  };

  const handleAddtoFavourites = async () => {
    await fetch(`${serverDomain}/movies/add-favourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-[80%] mx-auto my-[5rem] flex gap-12">
      <img src={movie.poster} alt="poster" className="w-[30%] rounded-lg" />
      <div className="mt-2">
        <h1 className="text-4xl font-bold mb-[1rem] text-blue-950">
          {movie.title}
        </h1>
        <div className="flex gap-3 text-blue-950">
          <span>{movie.releaseYear}</span>
          <span>{movie.duration} min</span>
        </div>
        <p className=" text-blue-950">{movie.genre}</p>
        <p className="flex items-center gap-4 text-blue-950">
          Rating:
          <Rating
            readonly
            initialValue={movie.rating}
            size={20}
            fillColor="#FFD700"
            emptyColor="#D3D3D3"
          />
        </p>
        <div className="flex gap-5 my-4">
          <button
            className="hover:bg-primary border-2 border-primary px-8 py-4 rounded-[3rem] font-bold hover:text-white transition-all duration-300"
            onClick={handleAddtoFavourites}
          >
            Add to favourites
          </button>
          <button
            className="bg-slate-800 text-white px-8 py-4 rounded-[3rem] font-bold hover:bg-black transition-all duration-300"
            onClick={handledelete}
          >
            Delete
          </button>
        </div>
        <p className=" text-blue-950">{movie.summary}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
