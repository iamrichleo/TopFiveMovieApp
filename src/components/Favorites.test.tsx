import { render, screen } from "@testing-library/react";
import Favorites from "./Favorites";
import type { Movie } from "../types";

const mockFavorites: Movie[] = [
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
  ];


describe("Favorites Component", () => {
  test("renders the title", () => {
    render(<Favorites favorites={mockFavorites} onFavoriteToggle={() => {}} onTrailerRequest={() => {}} setFavorites={() => {}} />);
    
    const titleElement = screen.getByText((content, element) => 
      content.startsWith("My ") && element?.tagName.toLowerCase() === 'h2'
    );

    expect(titleElement).toBeInTheDocument();
  });

  test("renders the correct number of favorite movie cards", () => {
    render(<Favorites favorites={mockFavorites} onFavoriteToggle={() => {}} onTrailerRequest={() => {}} setFavorites={() => {}} />);
    const movieCards = screen.getAllByRole("img");
    expect(movieCards.length).toBe(mockFavorites.length);
  });
});
