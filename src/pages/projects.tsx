import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";

const Projects = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const moviesPerPage = 10;

  const fetchMovies = useCallback(async (page = 1, append = false) => {
    if (append) setIsFetchingMore(true);
    else setIsLoading(true);

    try {
      const res = await axios.get(
        `http://www.omdbapi.com/?s=${searchQuery || "movie"}&page=${page}&apikey=c67dddef`
      );
      const newMovies = res.data.Search || [];
      setMovies((prev) => (append ? [...prev, ...newMovies] : newMovies));
      setTotalResults(parseInt(res.data.totalResults) || 0);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchMovies();
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, [searchQuery, fetchMovies]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (!isFetchingMore && currentPage < Math.ceil(totalResults / moviesPerPage)) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingMore, currentPage, totalResults, moviesPerPage]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchMovies(currentPage, true);
    }
  }, [currentPage, fetchMovies]);

  const toggleFavorite = (movie) => {
    const isFavorited = favorites.some((fav) => fav.imdbID === movie.imdbID);
    const updatedFavorites = isFavorited
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (movie) => favorites.some((fav) => fav.imdbID === movie.imdbID);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Discover Movies</h1>
      <p className="text-xl text-center mb-12">
        Discover the most popular movies and their amazing worlds
      </p>

      {/* Search Bar */}
      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg border-2 border-white bg-transparent text-white placeholder-white focus:outline-none"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.imdbID} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <Link href={`/movies/${movie.imdbID}`}>
                  <div className="cursor-pointer">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-72 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-2xl font-semibold">{movie.Title}</h2>
                    <p className="text-lg mt-2">{movie.Year}</p>
                  </div>
                </Link>
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`mt-4 px-4 py-2 rounded-lg text-sm ${
                    isFavorite(movie) ? "bg-red-500" : "bg-gray-700"
                  }`}
                >
                  {isFavorite(movie) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-white">No movies found.</p>
          )}
        </div>
      )}

      {isFetchingMore && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default Projects;
