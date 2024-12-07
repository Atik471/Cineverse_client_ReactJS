import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import FavouriteMovie from "./FavouriteMovie";
import { LocationContext } from "../providers/LocationProvider";
import { GiNightSleep } from "react-icons/gi";

const MyFavourites = () => {
  const [favourites, setfavourites] = useState([]);
  const [loading, setloading] = useState(true);
  const { user } = useContext(AuthContext);
  const { serverDomain } = useContext(LocationContext);

  useEffect(() => {
    fetch(`${serverDomain}/movies/favourites/${user.uid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setfavourites(data);
        setloading(false);
      })
      .catch((error) => console.log(error));
  }, [serverDomain, user.uid]);

  if (loading)
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <div className="w-28 h-28 border-8 border-primary border-solid rounded-full animate-spin border-t-transparent"></div>
        <p className="absolute inset-0 flex items-center justify-center text-primary font-semibold text-xl">
          Loading...
        </p>
      </div>
    </div>;

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto my-[3rem] sm:my-[4rem] lg:my-[5rem]">
      <div className="mb-8 sm:mb-10 lg:mb-12 text-center lg:text-left">
        <p className="text-base pb-3 md:pb-5 sm:text-lg font-medium sm:font-semibold text-black/70">
          Explore your watchlist
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-[3.5rem] font-bold text-black">
          My Favourite Movies
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:gap-6 gap-3 sm:gap-8">
        {favourites.length > 0 ? (
          favourites.map((favourite) => (
            <FavouriteMovie
              key={favourite._id}
              movie={favourite}
              setfavourites={setfavourites}
            ></FavouriteMovie>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center text-primary col-span-full gap-6 sm:gap-8 my-[3rem] sm:my-[4rem]">
            <GiNightSleep className="text-6xl sm:text-7xl lg:text-8xl"></GiNightSleep>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Wow, nothing to see!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavourites;
