import { render, screen } from "@testing-library/react";
import MovieList from "./MovieList";
import type { Movie } from "../types";

describe("MovieList Component", () => {
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: "Movie 1",
      overview: "Overview of Movie 1",
      poster_path: "/path_to_poster1.jpg",
      adult: false,
      backdrop_path: null,
      genre_ids: [12, 35],
      original_language: "en",
      original_title: "Original Movie 1",
      popularity: 80,
      release_date: "2022-01-01",
      video: false,
      vote_average: 8.0,
      vote_count: 100,
    },
    {
      id: 2,
      title: "Movie 2",
      overview: "Overview of Movie 2",
      poster_path: "/path_to_poster2.jpg",
      adult: false,
      backdrop_path: null,
      genre_ids: [12, 35],
      original_language: "en",
      original_title: "Original Movie 2",
      popularity: 70,
      release_date: "2022-02-01",
      video: false,
      vote_average: 7.5,
      vote_count: 50,
    },
    {
      id: 3,
      title: "Movie 3",
      overview: "Overview of Movie 3",
      poster_path: "/path_to_poster3.jpg",
      adult: false,
      backdrop_path: null,
      genre_ids: [12, 35],
      original_language: "en",
      original_title: "Original Movie 3",
      popularity: 50,
      release_date: "2022-01-01",
      video: false,
      vote_average: 9.0,
      vote_count: 800,
    },
  ];

  const mockFavorites = [
    { id: 1, title: "Movie 1", overview: "Overview 1", poster_path: "/path1.jpg" },
  ];

  const mockOnFavoriteToggle = vi.fn();
  const mockOnTrailerRequest = vi.fn();

  test("renders the correct number of MovieCard components", () => {
    render(
      <MovieList
        movies={mockMovies}
        onFavoriteToggle={mockOnFavoriteToggle}
        onTrailerRequest={mockOnTrailerRequest}
        favorites={mockFavorites}
      />
    );

    const movieCards = screen.getAllByRole("img");
    expect(movieCards).toHaveLength(mockMovies.length);
  });

  test("passes the correct props to MovieCard", () => {
    render(
      <MovieList
        movies={mockMovies}
        onFavoriteToggle={mockOnFavoriteToggle}
        onTrailerRequest={mockOnTrailerRequest}
        favorites={mockFavorites}
      />
    );

    const movieCard1 = screen.getByAltText("Movie 1");
    expect(movieCard1).toBeInTheDocument();
  });
});
