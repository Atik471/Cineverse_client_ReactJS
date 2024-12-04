import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Movie = ({movie}) => {
    const { _id, duration, genre, poster, rating, releaseYear, summary, title } = movie
    const navigate = useNavigate()

    return (
        <div>
            <p>Title: {title}</p>
            <button onClick={() => navigate(`/movie-details/${_id}`)}>Details</button>
        </div>
    );
};

Movie.propTypes = {
    movie: PropTypes.object,
}

export default Movie;