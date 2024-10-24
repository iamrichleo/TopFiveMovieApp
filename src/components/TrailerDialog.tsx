import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { fonts, colors } from "../styles/variables";

/* Styled Components */
const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const TrailerMessage = styled.p`
  font-size: 1.2rem;
  color: ${colors.fireEngineRed};
  text-align: center;
`;

const DialogContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${colors.background};
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
  color: #fff;
  max-width: 560px;
  width: 100%;
  overflow: hidden;
`;

const DialogTitle = styled(Dialog.Title)`
  font-size: 1.5rem;
  padding: 35px 0 35px 10px;
  width: 100%;
  margin: 0;
  font-family: ${fonts.main};
  font-size: 1.8rem;
  line-height: 1.05;
  font-weight: 400;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 2rem;
  padding: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 315px;
  display: block;
  margin: 0 auto;
`;

/* Types */
interface TrailerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMovie: any;
  trailerKey: string | null;
  trailerMessage: string | null;
}

/* Components */
const TrailerDialog: React.FC<TrailerDialogProps> = ({
  isOpen,
  onClose,
  selectedMovie,
  trailerKey,
  trailerMessage,
}) => (
  <Dialog.Root open={isOpen} onOpenChange={onClose}>
    <Overlay />
    <DialogContent>
      <CloseButton onClick={onClose}>
        <MdClose />
      </CloseButton>
      <DialogTitle>
        {selectedMovie ? `Trailer for ${selectedMovie.title}` : ""}
      </DialogTitle>
      {trailerMessage ? (
        <TrailerMessage>{trailerMessage}</TrailerMessage>
      ) : (
        trailerKey && (
          <Iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            allowFullScreen
          />
        )
      )}
    </DialogContent>
  </Dialog.Root>
);

export default TrailerDialog;
