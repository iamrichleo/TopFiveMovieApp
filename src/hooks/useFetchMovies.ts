import { useEffect, useState } from "react";
import { searchMovies } from "../api/movieAPI";

const useFetchMovies = (query: string) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) {
        setMovies([]); // Reset movies when there's no query
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fetchedMovies = await searchMovies(query); // Fetch movies based on the query

        if (Array.isArray(fetchedMovies)) {
          setMovies(fetchedMovies);
        } else {
          throw new Error("Expected an array of movies.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return { movies, loading, error };
};

export default useFetchMovies;
