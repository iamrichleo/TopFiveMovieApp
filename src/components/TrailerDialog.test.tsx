import { render, screen } from "@testing-library/react";
import TrailerDialog from "./TrailerDialog";
import type { Movie } from "../types";

describe("TrailerDialog Component", () => {
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

  const mockOnClose = vi.fn();

  test("renders correctly when isOpen is true", () => {
    render(
      <TrailerDialog
        isOpen={true}
        onClose={mockOnClose}
        selectedMovie={mockMovie}
        trailerKey="mockTrailerKey"
        trailerMessage={null}
      />,
    );

    expect(screen.getByText(/Trailer for Mock Movie/i)).toBeInTheDocument();
  });

  test("renders the trailer iframe when trailerKey is provided", () => {
    render(
      <TrailerDialog
        isOpen={true}
        onClose={mockOnClose}
        selectedMovie={mockMovie}
        trailerKey="mockTrailerKey"
        trailerMessage={null}
      />,
    );

    expect(screen.getByTitle("Trailer")).toBeInTheDocument();
  });

  test("renders the trailer message when trailerMessage is provided", () => {
    const message = "Trailer not available.";
    render(
      <TrailerDialog
        isOpen={true}
        onClose={mockOnClose}
        selectedMovie={mockMovie}
        trailerKey={null}
        trailerMessage={message}
      />,
    );

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test("calls onClose when the close button is clicked", () => {
    render(
      <TrailerDialog
        isOpen={true}
        onClose={mockOnClose}
        selectedMovie={mockMovie}
        trailerKey="mockTrailerKey"
        trailerMessage={null}
      />,
    );

    const closeButton = screen.getByRole("button");
    closeButton.click();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
