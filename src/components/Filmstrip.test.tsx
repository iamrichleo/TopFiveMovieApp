import { render } from "@testing-library/react";
import Filmstrip from "./Filmstrip";
import FilmstripImage from "../assets/FilmStrip.svg";

describe("Filmstrip Component", () => {
  test("renders Filmstrip component", () => {
    const { container } = render(<Filmstrip />);
    expect(container).toBeInTheDocument();
  });

  test("renders left and right filmstrip containers", () => {
    const { getAllByRole } = render(<Filmstrip />);

    const filmstripImages = getAllByRole("img");

    expect(filmstripImages.length).toBe(4);

    filmstripImages.forEach((img) => {
      expect(img).toHaveAttribute("alt", "Filmstrip");
    });
  });

  test("renders the correct number of filmstrip images", () => {
    const { container } = render(<Filmstrip />);
    
    const filmstripImages = container.querySelectorAll(`img[src="${FilmstripImage}"]`);
    
    expect(filmstripImages.length).toBe(4);
  });
});
