export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieApiResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}
