import React from "react";
import styled from "styled-components";
import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";
import { colors, fonts } from "../styles/variables";
import type { Movie } from "../types";

/* Styled Components */
const Card = styled.div<{ padding?: boolean }>`
  border: 1px solid ${colors.lightBlack};
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;
  padding: ${(props) => (props.padding ? "16px" : "0")};
  transition: transform 0.2s;
  flex: 1 1 calc(25% - 32px);
  position: relative;
  cursor: pointer;
  background-color: ${colors.placeholder};
  color: ${colors.text};

  &:hover {
    background-color: ${colors.lightBlack};
    transform: scale(1.05);
  }

  @media (max-width: 1024px) {
    flex: 1 1 calc(33% - 32px);
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 32px);
  }

  @media (max-width: 480px) {
    margin: 8px;
    padding: 12px;
    flex: 1 1 100%;
  }
`;

const Title = styled.h3`
  height: 2.3em;
  font-family: ${fonts.main};
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0;
  margin-bottom: 2rem;
`;

const Poster = styled.img`
  width: auto;
  height: 290px;
  object-fit: cover;
  border-radius: 4px;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${colors.lightBlack};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 10px;
`;

const HeartButton = styled.button<{
  isFavorite: boolean;
  isFavoriteCard?: boolean;
}>`
  padding: 8px;
  background-color: transparent;
  font-family: ${fonts.main};
  font-weight: 400;
  font-size: ${(props) => (props.isFavoriteCard ? "1rem" : "1.4rem")};
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isFavorite ? colors.neonBase : colors.inactive)};
  display: flex;
  align-items: stretch;
  justify-content: center;

  &:hover {
    color: ${(props) => (props.isFavorite ? colors.inactive : colors.neonBase)};
  }
`;

const Icon = styled.span<{ isFavoriteCard?: boolean }>`
  font-size: ${(props) => (props.isFavoriteCard ? "1rem" : "1.5rem")};
  margin-right: 4px;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${colors.fireEngineRed};
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 50px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover ${PlayButton} {
    opacity: 1;
  }
`;

/* Types */
interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle: (movie: Movie) => void;
  isFavorite: boolean;
  isFavoriteCard?: boolean;
  onTrailerRequest: (id: number) => void;
  showTitle?: boolean;
  className?: string;
}

/* Components */
const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onFavoriteToggle,
  isFavorite,
  onTrailerRequest,
  showTitle = true,
  className,
  isFavoriteCard,
}) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <Card className={className} padding={!isFavoriteCard}>
      <CardWrapper onClick={() => onTrailerRequest(movie.id)}>
        {showTitle && <Title>{movie.title}</Title>}
        {imgError ? (
          <Placeholder>
            <span style={{ color: colors.text }}>Image not available</span>
          </Placeholder>
        ) : (
          <Poster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onError={() => setImgError(true)}
          />
        )}
        <PlayButton>
          <FaPlay color="#fff" size={24} />
        </PlayButton>
      </CardWrapper>
      <ButtonContainer>
        <HeartButton
          isFavorite={isFavorite}
          isFavoriteCard={isFavoriteCard}
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(movie);
          }}
        >
          <Icon isFavoriteCard={isFavoriteCard}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </Icon>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </HeartButton>
      </ButtonContainer>
    </Card>
  );
};

export default MovieCard;
