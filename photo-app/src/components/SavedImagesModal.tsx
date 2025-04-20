import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background-color: var(--background-color);
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const ImageItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.3s ease;
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  
  &:hover {
    background-color: rgba(255, 0, 0, 1);
    transform: scale(1.1);
  }
`;

interface SavedImagesModalProps {
  onClose: () => void;
}

interface SavedImage {
  id: number;
  data: string;
}

export const SavedImagesModal: React.FC<SavedImagesModalProps> = ({ onClose }) => {
  const [savedImages, setSavedImages] = useState<SavedImage[]>([]);

  useEffect(() => {
    const loadSavedImages = async () => {
      const db = await openDatabase();
      const images = await getAllImages(db);
      setSavedImages(images);
    };

    loadSavedImages();
  }, []);

  const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('PhotoAppDB', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  };

  const getAllImages = async (db: IDBDatabase): Promise<SavedImage[]> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['images'], 'readonly');
      const store = transaction.objectStore('images');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  };

  const deleteImage = async (id: number) => {
    const db = await openDatabase();
    const transaction = db.transaction(['images'], 'readwrite');
    const store = transaction.objectStore('images');
    const request = store.delete(id);

    request.onsuccess = async () => {
      const updatedImages = await getAllImages(db);
      setSavedImages(updatedImages);
    };
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Saved Images</h2>
        <ImageGrid>
          {savedImages.map((image) => (
            <ImageItem key={image.id}>
              <img src={image.data} alt={`Saved image ${image.id}`} />
              <DeleteButton onClick={() => deleteImage(image.id)} title="Delete image">
                <svg viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </DeleteButton>
            </ImageItem>
          ))}
        </ImageGrid>
      </ModalContent>
    </ModalOverlay>
  );
}; 