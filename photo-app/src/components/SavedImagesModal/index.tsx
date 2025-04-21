import React, { useState, useEffect } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ImageGrid,
  ImageItem,
  DeleteButton,
} from "./styles";

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