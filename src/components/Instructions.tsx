import React from "react";
import styled from "styled-components";
import { colors, fonts } from "../styles/variables";

/* Styled Components */
const InstructionsContainer = styled.div`
  text-align: left;
  color: ${colors.text};
  font-family: ${fonts.main};
  font-size: 2rem;
  margin-top: 20px;
`;

const Title = styled.h2`
  font-family: ${fonts.main};
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const InstructionItem = styled.div`
  margin: 10px 0;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
`;

/* Components */
const Instructions: React.FC = () => (
  <InstructionsContainer>
    <Title>How To Use</Title>
    {[
      "1. Search by Movie Title (i.e. Moana)",
      "2. Click Movie Poster to Play a Trailer",
      "3. Heart to Favorite",
    ].map((instruction, index) => (
      <InstructionItem key={index}>{instruction}</InstructionItem>
    ))}
  </InstructionsContainer>
);

export default Instructions;
