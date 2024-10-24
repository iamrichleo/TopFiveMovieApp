import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../styles/variables";

/* Styled Components */

// Keyframes for the pulsating glow effect
const pulsateGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(0, 123, 255, 0.5);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
`;

const StyledInput = styled.input<{ $isfirstinteraction?: string }>`
  margin: 16px 0;
  padding: 16px;
  width: 100%;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 20px;
  background-color: ${colors.midBlack};
  color: ${colors.text};
  transition: box-shadow 0.3s ease; /* Smooth transition for box shadow */

  /* Pulsate glow effect until first interaction */
  animation: ${(props) => props.$isfirstinteraction && pulsateGlow} 1.5s
    infinite;

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 16px;
  }

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
`;

/* Types */
interface SearchBarProps {
  onSearch: (query: string) => void;
}

/* Components */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleClick = () => {
    setIsFirstInteraction(false);
  };

  return (
    <StyledInput
      type="text"
      placeholder="Search movies..."
      onChange={handleChange}
      onClick={handleClick}
      aria-label="Search movies"
      $isfirstinteraction={isFirstInteraction.toString()}
    />
  );
};

export default SearchBar;
