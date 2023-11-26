import React from 'react';
import { useEffect } from 'react';
import { ModalWindow, OverlayModalWindow } from './Modal.styled';

export const Modal = ({ onClose, image }) => {
  const handleCloseModalWindow = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  const handleCloseKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCloseKeyDown);
  });

  useEffect(() => {
    window.removeEventListener('keydown', handleCloseKeyDown);
  });

  return (
    <OverlayModalWindow onClick={handleCloseModalWindow}>
      <ModalWindow>
        <img src={image} alt={image.category} />
      </ModalWindow>
    </OverlayModalWindow>
  );
};
