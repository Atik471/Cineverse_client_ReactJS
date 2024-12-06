import { useContext } from "react";
import { Rating } from "react-simple-star-rating";
import { LocationContext } from "../providers/LocationProvider";
import { useForm } from "react-hook-form";

const AddMovies = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { serverDomain } = useContext(LocationContext);

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
    try {
      const response = await fetch(`${serverDomain}/movies/add`, {
        method: "POST",
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
      console.log("Movie added:", result);
      alert("Movie added successfully!");
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRating = (rate) => {
    setValue("rating", rate);
  };

  // bg-gray-800
  return (
    <div className="max-w-[60%] mx-auto bg-gray-800 my-[5rem] p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Add a Movie
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Movie Poster:
          </label>
          <input
            type="text"
            name="poster"
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
            {...register("genre", { required: "Please select a genre" })}
            className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Genre</option>
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
              ratingValue={0}
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
            placeholder="Enter a short summary of the movie"
            {...register("summary", {
              required: "Summary is required",
              minLength: {
                value: 10,
                message: "Summary must be at least 10 characters long",
              },
            })}
            className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.summary && (
            <p className="text-red-500 text-xs mt-2">
              {errors.summary.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovies;
