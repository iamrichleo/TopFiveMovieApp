import { describe, it, expect, vi } from 'vitest';
import { searchMovies, getMovieTrailers } from './movieAPI';
import fetchRequest from './fetchRequest'; 
import type { MovieApiResponse } from '../types';

vi.mock('./fetchRequest');

describe('Movie Service Functions', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('searchMovies', () => {
    it('should return a list of movies based on the search query', async () => {
      const mockApiResponse: MovieApiResponse = {
        page: 1,
        total_results: 100,
        total_pages: 100,
        results: [
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
        ],
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fetchRequest as any).mockResolvedValueOnce(mockApiResponse);

      const movies = await searchMovies('Movie');

      expect(fetchRequest).toHaveBeenCalledWith(
        expect.stringContaining('/search/movie'),
        {
          method: 'GET',
          responseType: 'json',
        }
      );
      expect(movies).toEqual(mockApiResponse.results.slice(0, 20));
    });

    it('should return an empty array if no movies are found', async () => {
      const mockApiResponse: MovieApiResponse = { 
        page: 1,
        total_results: 0,
        total_pages: 0,
        results: [] 
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fetchRequest as any).mockResolvedValueOnce(mockApiResponse);

      const movies = await searchMovies('Non-existent Movie');

      expect(movies).toEqual([]);
    });
  });

  describe('getMovieTrailers', () => {
    it('should return a list of videos for a given movie ID', async () => {
      const mockVideoResponse = { results: [{ id: 1, key: 'trailer1' }] };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fetchRequest as any).mockResolvedValueOnce(mockVideoResponse);

      const videos = await getMovieTrailers(123);

      expect(fetchRequest).toHaveBeenCalledWith(
        expect.stringContaining('/movie/123/videos'),
        {
          method: 'GET',
          responseType: 'json',
        }
      );
      expect(videos).toEqual(mockVideoResponse.results);
    });

    it('should return an empty array if no videos are found', async () => {
      const mockVideoResponse = { results: [] };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fetchRequest as any).mockResolvedValueOnce(mockVideoResponse);

      const videos = await getMovieTrailers(123);

      expect(videos).toEqual([]); 
    });
  });
});
