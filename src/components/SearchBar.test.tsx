import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    render(<SearchBar onSearch={mockOnSearch} />);
  });

  test("renders the input field", () => {
    const inputElement = screen.getByPlaceholderText(/search movies.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onSearch when typing in the input", () => {
    const inputElement = screen.getByPlaceholderText(/search movies.../i);
    fireEvent.change(inputElement, { target: { value: "Moana" } });
    expect(mockOnSearch).toHaveBeenCalledWith("Moana");
  });

  test("calls onSearch when the user types after clicking", () => {
    const inputElement = screen.getByPlaceholderText(/search movies.../i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "Moana" } });
    expect(mockOnSearch).toHaveBeenCalledWith("Moana");
  });
});
