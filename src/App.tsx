import React, { useState, useEffect } from "react";
import {
  Filmstrip,
  TrailerDialog,
  Instructions,
  MovieList,
  SearchBar,
  Favorites,
} from "./components";
import useFetchMovies from "./hooks/useFetchMovies";
import { getMovieTrailers } from "./api/movieAPI";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "./styles/variables";
import type { Movie } from "./types";

const AppWrapper = styled.div`
  position: relative;
  width: auto;
  height: auto;
  background: radial-gradient(
    500px circle at var(--x) var(--y),
    rgba(255, 255, 255, 0.2),
    transparent 70%
  );
  transition: background 0.3s ease;
`;

const NoMoviesMessage = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

const Container = styled.div<{ noMovies: boolean }>`
  padding: 20px 100px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: transparent;
  color: ${colors.text};
  position: relative;
  z-index: 1;
  height: auto;

  @media (min-width: 800px) {
    height: ${(props) => (props.noMovies ? "100vh" : "auto")};
  }

  @media (max-width: 500px) {
    padding: 20px 40px;
  }

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.noMovies ? "center" : "flex-start")};
`;

const motionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const { movies, loading, error } = useFetchMovies(query);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [trailerMessage, setTrailerMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFavoriteToggle = (movie: Movie) => {
    console.log("movie", movie);
    console.log("favorites", favorites);

    const movieId = movie.id;
    if (favorites.some((fav) => fav.id === movieId)) {
      setFavorites(favorites.filter((fav) => fav.id !== movieId));
    } else {
      if (favorites.length < 5) {
        setFavorites([...favorites, movie]);
      } else {
        setFavorites([...favorites.slice(0, 4), movie]);
      }
    }
  };

  const handleTrailerRequest = async (id: number) => {
    const movie = movies.find((m) => m.id === id);
    if (movie) {
      setSelectedMovie(movie);
      const trailers = await getMovieTrailers(id);
      const trailer = trailers.find((trailer) => trailer.type === "Trailer");
      if (trailer) {
        setTrailerKey(trailer.key);
        setTrailerMessage(null);
      } else {
        setTrailerMessage("Trailer not available for this movie.");
      }
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setTrailerKey(null);
    setSelectedMovie(null);
    setTrailerMessage(null);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const appElement = document.querySelector(".App") as HTMLElement;
      if (appElement) {
        appElement.style.setProperty("--x", `${clientX}px`);
        appElement.style.setProperty("--y", `${clientY + window.scrollY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <AppWrapper className="App">
      <Filmstrip />
      <Container noMovies={movies.length === 0}>
        <motion.div
          variants={motionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInVariants}>
            <Favorites
              favorites={favorites}
              onFavoriteToggle={handleFavoriteToggle}
              onTrailerRequest={handleTrailerRequest}
              setFavorites={setFavorites}
            />
          </motion.div>
          <motion.div variants={fadeInVariants}>
            <SearchBar
              onSearch={(query) => {
                setQuery(query);
                setHasSearched(true);
              }}
            />
          </motion.div>
          {loading && (
            <motion.div variants={fadeInVariants}>
              <p>Loading...</p>
            </motion.div>
          )}
          {error && (
            <motion.div variants={fadeInVariants}>
              <p>{error}</p>
            </motion.div>
          )}
          {hasSearched && movies.length === 0 && (
            <motion.div variants={fadeInVariants}>
              <NoMoviesMessage>
                No movies match your search results.
              </NoMoviesMessage>
            </motion.div>
          )}
          {!hasSearched && (
            <motion.div variants={fadeInVariants}>
              <Instructions />
            </motion.div>
          )}
          {hasSearched && movies.length > 0 && (
            <motion.div variants={fadeInVariants}>
              <MovieList
                movies={movies}
                onFavoriteToggle={handleFavoriteToggle}
                onTrailerRequest={handleTrailerRequest}
                favorites={favorites}
              />
            </motion.div>
          )}
        </motion.div>
        <TrailerDialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          selectedMovie={selectedMovie}
          trailerKey={trailerKey}
          trailerMessage={trailerMessage}
        />
      </Container>
    </AppWrapper>
  );
};

export default App;
