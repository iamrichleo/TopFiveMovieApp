import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import type { Movie } from "../types";

/* Styled Components */
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

/* Types */
interface MovieListProps {
  movies: Array<Movie>;
  onFavoriteToggle: (movie: Movie) => void;
  onTrailerRequest: (id: number) => void;
  favorites: Array<{
    id: number;
    title: string;
    overview: string;
    poster_path: string;
  }>;
}

/* Components */
const MovieList: React.FC<MovieListProps> = ({
  movies,
  onFavoriteToggle,
  onTrailerRequest,
  favorites,
}) => {
  return (
    <GridContainer>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onFavoriteToggle={onFavoriteToggle}
          onTrailerRequest={onTrailerRequest}
          isFavorite={favorites.some((fav) => fav.id === movie.id)}
        />
      ))}
    </GridContainer>
  );
};

export default MovieList;
