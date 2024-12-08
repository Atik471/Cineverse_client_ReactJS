import { useContext, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { LocationContext } from "../providers/LocationProvider";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateMovies = () => {
    const [movie, setmovie] = useState(null);
    const [loading, setloading] = useState(true);
    const param = useParams();
    const navigate = useNavigate();
    const { serverDomain } = useContext(LocationContext);
    
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();




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

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years;
  };
  const years = generateYears();

  const genres = [
    "Comedy",
    "Drama",
    "Horror",
    "Action",
    "Sci-Fi",
    "Romance",
    "Crime",
    "Thriller",
    "Animation",
  ];

  const onSubmit = async (data) => {
    setloading(true);
    try {
      const response = await fetch(`${serverDomain}/movies/update/${movie._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Error while adding movie");
      }

      const result = await response.json();
      console.log("Movie Updated:", result);
      toast.success("Movie Update successfully!", {
        position: "top-left",
        autoClose: 2000,
      });
      navigate(`/movie-details/${movie._id}`)
    } catch (error) {
      toast.error(`Movie Update Failed! ${error}`, {
        position: "top-left",
        autoClose: 2000,
      });
    }
    finally {
      setloading(false);
    }
  };

  const handleRating = (rate) => {
    setValue("rating", rate);
  };

  // bg-gray-800
  return (
    <div className="md:max-w-[60%] max-w-[94%] mx-auto bg-gray-800 md:my-[5rem] my-[2rem] p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Update Movie
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Movie Poster:
          </label>
          <input
            type="text"
            name="poster"
            defaultValue={movie.poster}
            placeholder="Enter poster URL"
            {...register("poster", {
              required: "Poster URL is required",
              pattern: {
                value: /^https?:\/\/[^\s]+$/i,
                message: "Please enter a valid image URL",
              },
            })}
            className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.poster && (
            <p className="text-red-500 text-xs mt-2">{errors.poster.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Movie Title:
          </label>
          <input
            type="text"
            name="title"
            defaultValue={movie.title}
            placeholder="Enter movie title"
            {...register("title", {
              required: "Movie title is required",
              minLength: {
                value: 2,
                message: "Title must be at least 2 characters long",
              },
            })}
            className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-2">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Genre:
          </label>
          <select
            name="genre"
            defaultValue={movie.genre}
            {...register("genre", { required: "Please select a genre" })}
            className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value=''>Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-500 text-xs mt-2">{errors.genre.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Duration (minutes):
          </label>
          <input
            type="number"
            name="duration"
            defaultValue={movie.duration}
            placeholder="Enter duration in minutes"
            {...register("duration", {
              required: "Duration is required",
              min: {
                value: 60,
                message: "Duration must be greater than 60 minutes",
              },
            })}
            className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.duration && (
            <p className="text-red-500 text-xs mt-2">
              {errors.duration.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Release Year:
          </label>
          <select
            name="releaseYear"
            defaultValue={movie.releaseYear}
            {...register("releaseYear", {
              required: "Please select a release year",
            })}
            className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.releaseYear && (
            <p className="text-red-500 text-xs mt-2">
              {errors.releaseYear.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Rating:
          </label>
          <div className="flex items-center gap-4">
            <Rating
              onClick={handleRating}
              value={movie.rating}
              allowHalfIcon={true}
            />
          </div>
          {errors.rating && (
            <p className="text-red-500 text-xs mt-2">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Summary:
          </label>
          <textarea
            name="summary"
            defaultValue={movie.summary}
            placeholder="Enter a short summary of the movie"
            {...register("summary", {
              required: "Summary is required",
              minLength: {
                value: 10,
                message: "Summary must be at least 10 characters long",
              },
            })}
            className="w-full px-4 py-2 h-24 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.summary && (
            <p className="text-red-500 text-xs mt-2">
              {errors.summary.message}
            </p>
          )}
        </div>

        <div className="relative">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        >
          Update Movie
        </button>
        {loading ? (
            <div className="absolute top-[20%] right-[50%] w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            ""
          )}
        </div>
        
      </form>
    </div>
  );
};

export default UpdateMovies;
