import Link from "next/link";
import { useState, useEffect } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
    setLoading(false); // Stop loading once favorites are fetched
  }, []);

  const removeFavorite = (imdbID: string) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-purple-700 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-6">My Favorite Movies</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div> {/* Add a loading spinner */}
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favorites.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-gray-700"
            >
              <Link href={`/movies/${movie.imdbID}`}>
                <div className="cursor-pointer">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-72 object-cover rounded-md mb-4 transform transition-transform hover:scale-110"
                  />
                  <h2 className="text-2xl font-semibold">{movie.Title}</h2>
                  <p className="text-lg mt-2">{movie.Year}</p>
                </div>
              </Link>
              <button
                onClick={() => removeFavorite(movie.imdbID)}
                className="mt-4 px-4 py-2 bg-red-500 rounded-lg text-sm hover:bg-red-700"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl mt-12">You haven't added any movies to your favorites yet.</p>
      )}

      <div className="text-center mt-8">
        <Link href="/projects">
          <button className="px-6 py-3 bg-white text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white">
            Back to Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Favorites;
