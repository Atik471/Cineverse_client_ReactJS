import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    <div className="w-[90%] sm:w-[80%] mx-auto md:my-[5rem] my-8 flex flex-col sm:flex-row md:gap-12 gap-6">
      <div className="md:hidden ml-2">
        <h1 className="text-4xl font-bold md:mb-[1rem] mb-4 text-black">
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
      </div>
      <img
        src={movie.poster}
        alt="poster"
        className="w-full sm:w-[30%] rounded-lg mb-4 sm:mb-0"
      />
      <div className="mt-2">
        <div className=" hidden md:block">
        <h1 className="text-4xl font-bold mb-[1rem] text-black">
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
        </div>
        <p className="text-blue-950 md:hidden mb-4">{movie.summary}</p>
        <div className="flex gap-5 md:my-4 flex-col sm:flex-row">
          <button
            className="hover:bg-primary border-2 border-primary px-8 md:py-4 rounded-[3rem] font-bold hover:text-white transition-all duration-300 w-full sm:w-auto py-2"
            onClick={handleAddtoFavourites}
          >
            Add to favourites
          </button>
          <button
            className="bg-slate-800 text-white px-8 md:py-4 py-2 rounded-[3rem] font-bold hover:bg-black transition-all duration-300 w-full sm:w-auto"
            onClick={handledelete}
          >
            Delete
          </button>
          <Link
            to={`/update-movie/${movie._id}`}
            className="bg-slate-800 text-white px-8 md:py-4 py-2 rounded-[3rem] font-bold hover:bg-black transition-all duration-300 w-full sm:w-auto text-center"
          >
            Update
          </Link>
        </div>
        <p className="text-blue-950 md:flex hidden">{movie.summary}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
