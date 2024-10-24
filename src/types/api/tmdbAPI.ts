export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
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
