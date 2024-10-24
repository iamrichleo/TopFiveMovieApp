import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "./MovieCard";
import type { Movie } from "../types";

describe("MovieCard Component", () => {
  const mockMovie: Movie = {
    id: 1,
    title: "Mock Movie",
    overview: "Mock overview",
    poster_path: "/mock_poster.jpg",
    adult: false,
    backdrop_path: null,
    genre_ids: [],
    original_language: "en",
    original_title: "Mock Original Title",
    popularity: 0,
    release_date: "2022-01-01",
    video: false,
    vote_average: 0,
    vote_count: 0,
  };

  const mockOnFavoriteToggle = vi.fn();
  const mockOnTrailerRequest = vi.fn();

  test("renders movie title", () => {
    render(
      <MovieCard
        movie={mockMovie}
        onFavoriteToggle={mockOnFavoriteToggle}
        isFavorite={false}
        onTrailerRequest={mockOnTrailerRequest}
      />
    );

    const titleElement = screen.getByText(mockMovie.title);
    expect(titleElement).toBeInTheDocument();
  });

  test("calls onTrailerRequest when clicked", () => {
    render(
      <MovieCard
        movie={mockMovie}
        onFavoriteToggle={mockOnFavoriteToggle}
        isFavorite={false}
        onTrailerRequest={mockOnTrailerRequest}
      />
    );

    const cardElement = screen.getByText(mockMovie.title).closest("div");
    if (cardElement) {
      fireEvent.click(cardElement);
    }
    expect(mockOnTrailerRequest).toHaveBeenCalledWith(mockMovie.id);
  });

  test("calls onFavoriteToggle when heart button is clicked", () => {
    render(
      <MovieCard
        movie={mockMovie}
        onFavoriteToggle={mockOnFavoriteToggle}
        isFavorite={false}
        onTrailerRequest={mockOnTrailerRequest}
      />
    );

    const heartButton = screen.getByRole("button");
    fireEvent.click(heartButton);
    expect(mockOnFavoriteToggle).toHaveBeenCalledWith(mockMovie);
  });
});
