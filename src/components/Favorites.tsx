import React from "react";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import { colors, fonts } from "../styles/variables";
import type { Movie } from "../types";

/* Styled Components */
const Container = styled.div`
  margin: 16px 0;
  color: ${colors.text};

  @media (max-width: 480px) {
    margin: 8px 0;
  }
`;

const Title = styled.h2`
  font-family: ${fonts.main};
  font-size: 3rem;
  font-weight: 400;
`;

const NeonTitle = styled.span`
  text-shadow:
    0 0 1vw ${colors.neonAura},
    0 0 3vw ${colors.neonAura},
    0 0 10vw ${colors.neonAura},
    0 0 0.4vw ${colors.neonBase};
  color: ${colors.neonBase};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
  gap: 16px;
`;

const BaseSequenceNumber = styled.span`
  font-size: 2rem;
  font-weight: bold;
  font-family: ${fonts.main};
  color: ${colors.text};
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const SequenceNumberOverlay = styled(BaseSequenceNumber)`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 6px 10px;
`;

const SequenceNumber = styled(BaseSequenceNumber)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Placeholder = styled.div`
  height: 100px;
  background-color: #333;
  border-radius: 8px;
  position: relative;
`;

/* Types */
interface FavoritesProps {
  favorites: Array<Movie>;
  onFavoriteToggle: (movie: Movie) => void;
  onTrailerRequest: (id: number) => void;
  setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
}

/* Components */
const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  onTrailerRequest,
  setFavorites,
}) => {
  const placeholders = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <Container>
      <Title>
        My <NeonTitle>Top 5 Favorite</NeonTitle> Movies
      </Title>
      <GridContainer>
        {placeholders.map((placeholder, index) => {
          const favoriteMovie = favorites[index];

          return (
            <div key={index} style={{ position: "relative" }}>
              {favoriteMovie ? (
                <>
                  <SequenceNumberOverlay>{placeholder}</SequenceNumberOverlay>
                  <MovieCard
                    movie={favoriteMovie}
                    onFavoriteToggle={(movie) => {
                      if (favorites.length > 0) {
                        setFavorites(
                          favorites.filter((fav) => fav.id !== movie.id),
                        );
                      }
                    }}
                    onTrailerRequest={onTrailerRequest}
                    isFavorite={true}
                    showTitle={false}
                    isFavoriteCard
                    className="small-card"
                  />
                </>
              ) : (
                <Placeholder>
                  <SequenceNumber>{placeholder}</SequenceNumber>
                </Placeholder>
              )}
            </div>
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default Favorites;
