import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "./App";

vi.mock("./hooks/useFetchMovies", () => ({
  default: () => ({
    movies: [],
    loading: false,
    error: null,
  }),
}));

vi.mock("./api/movieAPI", () => ({
  getMovieTrailers: vi.fn(),
}));

describe("App Component", () => {
  it("should render the MovieList component when movies are found", () => {
    vi.mock("./hooks/useFetchMovies", () => ({
      default: () => ({
        movies: [{ id: 1, title: "Movie 1" }],
        loading: false,
        error: null,
      }),
    }));

    render(<App />);

    const searchBar = screen.getByRole("textbox");
    fireEvent.change(searchBar, { target: { value: "Movie 1" } });
    fireEvent.keyDown(searchBar, { key: "Enter" });

    expect(screen.getByText(/movie 1/i)).toBeInTheDocument();
  });

  it("should toggle favorite when favorite button is clicked", () => {
    vi.mock("./hooks/useFetchMovies", () => ({
      default: () => ({
        movies: [{ id: 1, title: "Movie 1" }],
        loading: false,
        error: null,
      }),
    }));

    render(<App />);

    const searchBar = screen.getByRole("textbox");
    fireEvent.change(searchBar, { target: { value: "Movie 1" } });
    fireEvent.keyDown(searchBar, { key: "Enter" });

    const favoriteButton = screen.getByRole("button", { name: /favorite/i });
    fireEvent.click(favoriteButton);
  });
});
