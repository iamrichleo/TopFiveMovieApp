import { render, screen } from "@testing-library/react";
import Instructions from "./Instructions";

describe("Instructions Component", () => {
  test("renders the title", () => {
    render(<Instructions />);
    const titleElement = screen.getByText(/How To Use/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders instruction items", () => {
    render(<Instructions />);
    const instructionItems = [
      "1. Search by Movie Title (i.e. Moana)",
      "2. Click Movie Poster to Play a Trailer",
      "3. Heart to Favorite",
    ];
    instructionItems.forEach((instruction) => {
      expect(screen.getByText(instruction)).toBeInTheDocument();
    });
  });
});
