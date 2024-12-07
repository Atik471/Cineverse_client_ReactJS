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
      className="h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem] bg-cover bg-center rounded-t-lg mb-12 sm:mb-16 lg:mb-24 xl:mb-32 relative group"
    >
      <div className="bg-transparent group-hover:bg-black/60 h-full opacity-0 group-hover:opacity-100 transition-all duration-500 text-white rounded-t-lg flex justify-center items-center flex-col text-center">
        <button
          onClick={handledelete}
          className="px-8 sm:px-12 py-2 sm:py-3 rounded-[4rem] border-2 border-white hover:bg-[#a82323]/80 font-semibold transition-all duration-500"
        >
          Remove
        </button>
      </div>

      <div className="mx-2 sm:mx-4 my-2 sm:my-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex-grow text-center sm:text-left">
          <h1 className="font-semibold text-lg sm:text-xl mb-1 sm:mb-2">
            {title}
          </h1>
          <p className="font-extralight text-xs sm:text-sm">
            {duration} min, <span className="text-primary">{genre}</span>
          </p>
        </div>
        <Rating
          readonly
          initialValue={rating}
          size={18}
          fillColor="#FFD700"
          emptyColor="#D3D3D3"
        />
      </div>
    </div>
  );
};

FavouriteMovie.propTypes = {
  movie: PropTypes.object,
  setfavourites: PropTypes.func,
};

export default FavouriteMovie;
