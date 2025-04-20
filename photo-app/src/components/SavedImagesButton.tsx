import React, { useState } from 'react';
import styled from '@emotion/styled';
import { SavedImagesModal } from './SavedImagesModal';

const SavedImagesButton = styled.button`
  position: fixed;
  top: 80px;
  left: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  background-color: var(--background-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.3s ease;
  z-index: 1000;

  svg {
    width: 18px;
    height: 18px;
    fill: var(--primary-color);
  }

  &:hover {
    transform: scale(1.1);
    background-color: var(--primary-color);
    
    svg {
      fill: var(--background-color);
    }
  }

  @media (max-width: 768px) {
    top: 70px;
    width: 28px;
    height: 28px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const SavedImagesButtonComponent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SavedImagesButton onClick={() => setShowModal(true)} title="View saved images">
        <svg viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      </SavedImagesButton>
      {showModal && <SavedImagesModal onClose={() => setShowModal(false)} />}
    </>
  );
}; 