import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const Movie = ({ movie }) => {
  const { _id, duration, genre, poster, rating, title } = movie;
  const navigate = useNavigate();

  return (
    <div
      style={{ backgroundImage: `url(${poster})` }}
      className="h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem] bg-cover bg-center rounded-t-lg mb-28 md:mb-36 lg:mb-32 relative group"
    >
      <div className="bg-transparent group-hover:bg-black/60 h-full opacity-0 group-hover:opacity-100 transition-all duration-500 text-white rounded-t-lg flex justify-center items-center flex-col text-center">
        <button
          onClick={() => navigate(`/movie-details/${_id}`)}
          className="px-6 sm:px-10 md:px-12 py-2 md:py-3 rounded-[4rem] border-2 border-primary hover:bg-primary/80 font-semibold transition-all duration-500"
        >
          Details
        </button>
      </div>

      <div className="mx-3 sm:mx-4 my-2 sm:my-3 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
        <div className="flex-grow text-center sm:text-left">
          <h1 className="font-semibold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">
            {title}
          </h1>
          <p className="font-extralight text-xs sm:text-sm md:text-base">
            {duration} min, <span className="text-primary">{genre}</span>
          </p>
        </div>
        <Rating
          readonly
          initialValue={rating}
          size={16}
          sm={{ size: 18 }}
          md={{ size: 20 }}
          fillColor="#FFD700"
          emptyColor="#D3D3D3"
        />
      </div>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.object,
};

export default Movie;
