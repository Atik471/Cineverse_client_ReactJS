import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../providers/LocationProvider";
import Movie from "./Movie";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
  const [movies, setmovies] = useState([]);
  const [loading, useloading] = useState(true);
  const { serverDomain } = useContext(LocationContext);

  useEffect(() => {
    fetch(`${serverDomain}/top-movies`)
      .then((res) => res.json())
      .then((data) => {
        setmovies(data);
        useloading(false);
      })
      .catch((error) => console.log(error));
  }, []);

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

  return (
    <div className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto py-12 sm:py-16 lg:py-[5rem]">
      <div className="mb-8 sm:mb-10 lg:mb-12 text-center lg:text-left flex flex-wrap items-center justify-center lg:justify-between gap-6">
        <div>
          <p className="text-base pb-3 md:pb-5 sm:text-lg font-medium sm:font-semibold text-black/70">
            Explore our most popular movies
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-[3.5rem] font-bold text-black leading-tight">
            Featured Movies
          </h1>
        </div>
        <Link
          to="/all-movies"
          className="bg-primary hover:bg-black transition-all duration-500 md:px-6 px-2 md:py-3 py-1 text-base md:text-lg rounded-[3rem] font-bold text-white flex gap-3 items-center"
        >
          See all movies
          <FaArrowRightLong></FaArrowRightLong>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-3 sm:gap-8">
        {movies.map((movie) => (
          <Movie key={movie._id} movie={movie}></Movie>
        ))}
      </div>
    </div>
  );
};

export default Home;
