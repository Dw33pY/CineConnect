import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      const res = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=c67dddef`
      );
      setMovie(res.data);
    };

    fetchMovieDetails();
  }, [id]);

  const addToFavorites = () => {
    if (movie) {
      let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
      <button
        onClick={() => router.push("/projects")}
        className="bg-white text-blue-600 py-2 px-6 rounded-lg mb-6 transition-all hover:bg-blue-600 hover:text-white"
      >
        Back to Movies
      </button>

      <h1 className="text-4xl font-bold text-center mb-6">{movie.Title}</h1>

      <div className="flex flex-col items-center md:flex-row gap-8">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full max-w-xs h-80 object-cover rounded-md"
        />
        <div className="flex flex-col justify-center">
          <p className="text-xl mb-4">{movie.Plot}</p>
          <p className="text-lg">
            <strong>Release Date:</strong> {movie.Released}
          </p>
          <p className="text-lg">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="text-lg">
            <strong>Cast:</strong> {movie.Actors}
          </p>
          <p className="text-lg">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="text-lg">
            <strong>IMDB Rating:</strong> {movie.imdbRating}
          </p>

          {/* Add to Favorites Button */}
          <button
            onClick={addToFavorites}
            className="px-4 py-2 mt-4 bg-blue-500 rounded-lg hover:bg-blue-700"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
