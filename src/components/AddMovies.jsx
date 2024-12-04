import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const AddMovies = () => {
  const [formData, setFormData] = useState({
    poster: "",
    title: "",
    genre: "",
    duration: "",
    releaseYear: "",
    rating: 0,
    summary: "",
  });

  const [errors, setErrors] = useState({});

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years;
  };
  const years = generateYears();

  const genres = ["Comedy", "Drama", "Horror", "Action", "Sci-Fi", "Romance", "Crime", "Thriller", "Animation"];

  const validate = () => {
    const newErrors = {};

    const regex = /^https?:\/\/[^\s]+$/i;
    if (!regex.test(formData.poster)) {
      newErrors.poster = "Please enter a valid image link.";
    }

    if (!formData.title.trim() || formData.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters.";
    }

    if (!formData.genre) {
      newErrors.genre = "Please select a genre.";
    }

    if (!formData.duration || formData.duration <= 60) {
      newErrors.duration = "Duration must be greater than 60 minutes.";
    }

    if (!formData.releaseYear) {
      newErrors.releaseYear = "Please select a release year.";
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please select a rating.";
    }

    if (!formData.summary.trim() || formData.summary.length < 10) {
      newErrors.summary = "Summary must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      try {
        const movieData = {
          poster: formData.poster,
          title: formData.title,
          genre: formData.genre,
          duration: formData.duration,
          releaseYear: formData.releaseYear,
          rating: formData.rating,
          summary: formData.summary,
        };
  
        const response = await fetch('http://localhost:5000/movies/add', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(movieData),
        });
  
        if (!response.ok) {
          console.log(response);
          throw new Error('Error while adding movie');
        }
  
        const result = await response.json();
        console.log('Movie added:', result);
        alert("Movie added successfully!");
  
        setFormData({
          poster: "",
          title: "",
          genre: "",
          duration: "",
          releaseYear: "",
          rating: 0,
          summary: "",
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rate) => {
    setFormData((prev) => ({ ...prev, rating: rate }));
  };

  return (
    <div >
      <h2>Add a Movie</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Movie Poster:</label>
          <input
            type="text"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            placeholder="Enter poster URL"
          />
          {errors.poster && <p style={{ color: "red" }}>{errors.poster}</p>}
        </div>

        <div>
          <label>Movie Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter movie title"
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>

        <div>
          <label>Genre:</label>
          <select name="genre" value={formData.genre} onChange={handleChange}>
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && <p style={{ color: "red" }}>{errors.genre}</p>}
        </div>

        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration in minutes"
          />
          {errors.duration && <p style={{ color: "red" }}>{errors.duration}</p>}
        </div>

        <div>
          <label>Release Year:</label>
          <select
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.releaseYear && <p style={{ color: "red" }}>{errors.releaseYear}</p>}
        </div>

        
        <div style={{ display: "flex", alignItems: "center" }}>
          <label>Rating:</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <Rating
              onClick={handleRating}
              ratingValue={formData.rating}
              allowHalfIcon={true}
            />
          </div>
          {errors.rating && <p style={{ color: "red" }}>{errors.rating}</p>}
        </div>

        <div>
          <label>Summary:</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Enter a short summary of the movie"
          />
          {errors.summary && <p style={{ color: "red" }}>{errors.summary}</p>}
        </div>

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovies;
