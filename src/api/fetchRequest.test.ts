import { describe, it, expect, vi } from "vitest";
import fetchRequest from "./fetchRequest";

describe("fetchRequest", () => {
  const mockFetch = vi.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should make a GET request and return JSON data", async () => {
    const mockResponse = { message: "Success" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await fetchRequest<{ message: string }>(
      "https://api.example.com/data"
    );

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/data", {
      method: "GET",
      headers: {},
      body: undefined,
    });
    expect(response).toEqual(mockResponse);
  });

  it("should make a POST request with a body and return JSON data", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestBody: any = { name: "Item" };
    const mockResponse = { message: "Created" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await fetchRequest<{ message: string }>(
      "https://api.example.com/data",
      {
        method: "POST",
        body: requestBody,
      }
    );

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/data", {
      method: "POST",
      headers: {},
      body: JSON.stringify(requestBody),
    });
    expect(response).toEqual(mockResponse);
  });

  it("should throw an error on a failed request", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(fetchRequest("https://api.example.com/data")).rejects.toThrow(
      "HTTP error! Status: 404 - Not Found"
    );
  });

  it("should return text response type", async () => {
    const mockResponse = "Success";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockResponse,
    });

    const response = await fetchRequest<string>(
      "https://api.example.com/data",
      {
        responseType: "text",
      }
    );

    expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/data", {
      method: "GET",
      headers: {},
      body: undefined,
    });
    expect(response).toEqual(mockResponse);
  });
});
