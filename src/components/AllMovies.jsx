// import { useContext, useEffect, useState } from "react";
// import Movie from "./Movie";
// import { LocationContext } from "../providers/LocationProvider";

// const AllMovies = () => {
//   const [movies, setmovies] = useState([]);
//   const [loading, useloading] = useState(true);
//   const { serverDomain } = useContext(LocationContext);

//   useEffect(() => {
//     fetch(`${serverDomain}/movies`)
//       .then((res) => res.json())
//       .then((data) => {
//         setmovies(data);
//         useloading(false);
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="relative">
//           <div className="w-28 h-28 border-8 border-primary border-solid rounded-full animate-spin border-t-transparent"></div>
//           <p className="absolute inset-0 flex items-center justify-center text-primary font-semibold text-xl">
//             Loading...
//           </p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto my-12 sm:my-16 lg:my-[5rem]">
//       <div className="mb-8 sm:mb-10 lg:mb-12 text-center lg:text-left">
//         <p className="text-base pb-3 md:pb-5 sm:text-lg font-medium sm:font-semibold text-black/70">
//           Explore our most popular movies
//         </p>
//         <h1 className="text-2xl sm:text-3xl lg:text-[3.5rem] font-bold text-black">
//           Movies For You
//         </h1>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-3 sm:gap-8">
//         {movies.map((movie) => (
//           <Movie key={movie._id} movie={movie}></Movie>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllMovies;
import { useContext, useEffect, useState } from "react";
import Movie from "./Movie";
import { LocationContext } from "../providers/LocationProvider";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { serverDomain } = useContext(LocationContext);

  useEffect(() => {
    fetch(`${serverDomain}/movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [serverDomain]);

  useEffect(() => {
    if (search === "") {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, movies]);

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
    <div className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto my-12 sm:my-16 lg:my-[5rem]">
      <div className="md:mb-8 mb-4 sm:mb-10 lg:mb-12 text-center lg:text-left flex justify-between md:flex-row flex-col">
        <div>
          <p className="text-base pb-3 md:pb-5 sm:text-lg font-medium sm:font-semibold text-black/70">
            Explore our most popular movies
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-[3.5rem] font-bold text-black">
            Movies For You
          </h1>
        </div>
        <div className="md:mt-8 mt-4 md:mr-0 w-[80%] md:w-full max-w-md mx-auto md:text-base text-sm">
          <input
            type="text"
            className="w-full p-2 sm:p-4 md:p-5 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search by movie title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-3 sm:gap-8">
        {filteredMovies.map((movie) => (
          <Movie key={movie._id} movie={movie}></Movie>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
