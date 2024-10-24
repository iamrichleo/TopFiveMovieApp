import React from "react";
import styled, { keyframes } from "styled-components";
import FilmstripImage from "../assets/FilmStrip.svg";

const scrollUpAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const scrollDownAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;

const FilmstripContainerLeft = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 200%;
  width: 50px;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  @media (max-width: 500px) {
    display: none;
  }
`;

const FilmstripContainerRight = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 200%;
  width: 50px;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  @media (max-width: 500px) {
    display: none;
  }
`;

const FilmstripUp = styled.img`
  height: 50%;
  width: 100%;
  animation: ${scrollUpAnimation} 20s linear infinite;
  display: block;
`;

const FilmstripDown = styled.img`
  height: 50%;
  width: 100%;
  animation: ${scrollDownAnimation} 20s linear infinite;
  display: block;
`;

const Filmstrip: React.FC = () => (
  <>
    <FilmstripContainerLeft>
      <FilmstripUp src={FilmstripImage} alt="Filmstrip" />
      <FilmstripUp src={FilmstripImage} alt="Filmstrip" />
    </FilmstripContainerLeft>
    <FilmstripContainerRight>
      <FilmstripDown src={FilmstripImage} alt="Filmstrip" />
      <FilmstripDown src={FilmstripImage} alt="Filmstrip" />
    </FilmstripContainerRight>
  </>
);

export default Filmstrip;
