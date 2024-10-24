import fetchRequest from "./fetchRequest";
import type { Movie, MovieApiResponse, Video } from "../types";

const API_KEY = "d8ce07223c86468241516ca69064792c";
const BASE_URL = "https://api.themoviedb.org/3";

// Function to search movies based on a query
export const searchMovies = async (query: string): Promise<Movie[]> => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;

  const response = await fetchRequest<MovieApiResponse>(url, {
    method: "GET",
    responseType: "json",
  });

  return response.results.slice(0, 20) || []; // Limit to 20 movies
};

// Function to get trailers for a specific movie
export const getMovieTrailers = async (movieId: number): Promise<Video[]> => {
  const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;

  // Expecting a different response structure for videos
  const response = await fetchRequest<{ results: Video[] }>(url, {
    method: "GET",
    responseType: "json",
  });

  // Return the array of videos (trailers)
  return response.results || []; // This will be the array of Video objects
};
