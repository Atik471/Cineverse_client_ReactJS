import PropTypes from "prop-types";
import { useContext } from "react";
import { LocationContext } from "../providers/LocationProvider";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const FavouriteMovie = ({ movie, setfavourites }) => {
  const { _id, duration, genre, poster, rating, title } = movie;
  const { serverDomain } = useContext(LocationContext);
  const navigate = useNavigate();

  const handledelete = async () => {
    await fetch(`${serverDomain}/movies/favourites/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setfavourites((prevFavourites) =>
          prevFavourites.filter((favMovie) => favMovie._id !== _id)
        );
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      style={{ backgroundImage: `url(${poster})` }}
      className="h-[30rem] bg-cover bg-center rounded-t-lg mb-32"
    >
      <div className="bg-transparent hover:bg-black/60 h-full opacity-0 hover:opacity-100 transition-all duration-500 text-white rounded-t-lg flex justify-center items-center flex-col text-center">
        {/* <button
          onClick={() => navigate(`/movie-details/${_id}`)}
          className="px-12 p-3 mb-4 rounded-[4rem] border-2 border-primary hover:bg-primary/80 font-semibold transition-all duration-500"
        >
          Details
        </button> */}
        <button
          onClick={handledelete}
          className="px-12 p-3 rounded-[4rem] border-2 border-white hover:bg-[#a82323]/80 font-semibold transition-all duration-500"
        >
          Remove
        </button>
      </div>
      <div className="mx-2 my-3 flex justify-between">
        <div className="flex-grow">
          <h1 className="font-semibold text-xl mb-2">{title}</h1>
          <p className="font-extralight text-sm">
            {duration} min, <span className="text-primary">{genre}</span>
          </p>
        </div>
        <Rating
          readonly
          initialValue={rating}
          size={20}
          fillColor="#FFD700"
          emptyColor="#D3D3D3"
        />
        <div></div>
      </div>
    </div>
  );
};

FavouriteMovie.propTypes = {
  movie: PropTypes.object,
  setfavourites: PropTypes.func,
};

export default FavouriteMovie;
