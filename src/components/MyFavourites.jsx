import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import FavouriteMovie from "./FavouriteMovie";
import { LocationContext } from "../providers/LocationProvider";

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

  if (loading) <p>Loading...</p>;
  return (
    <div className="w-[80%] mx-[10%] my-[5rem]">
      <div className="mb-12">
        <p className="text-lg font-semibold text-black/70">
          Explore your watchlist
        </p>
        <h1 className="text-[3.5rem] font-bold text-black">Your Favourite Movies</h1>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {favourites.map((favourite) => (
          <FavouriteMovie
            key={favourite._id}
            movie={favourite}
            setfavourites={setfavourites}
          ></FavouriteMovie>
        ))}
      </div>
    </div>
  );
};

export default MyFavourites;
