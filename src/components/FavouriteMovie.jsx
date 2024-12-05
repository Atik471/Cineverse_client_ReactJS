import PropTypes from 'prop-types';

const FavouriteMovie = ({movie, setfavourites}) => {
    const { _id, duration, genre, poster, rating, releaseYear, summary, title } = movie

    const handledelete = async() => {
        await fetch(`http://localhost:5000/movies/favourites/${_id}`, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            setfavourites((prevFavourites) =>
                prevFavourites.filter((favMovie) => favMovie._id !== _id)
            );
        })
        .catch(error => console.log(error))
    }
    return (
        <div>
            <p>Title: {title}</p>
            <button onClick={handledelete}>Delete</button>
        </div>
    );
};

FavouriteMovie.propTypes = {
    movie: PropTypes.object,
    setfavourites: PropTypes.func,
}

export default FavouriteMovie;