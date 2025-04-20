import React, { useCallback, useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../contexts/ThemeContext';
import { saveImageToDB } from '../utils/indexedDB';
import { Toast } from './Toast';

const ImageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 16/9;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    aspect-ratio: 4/3;
  }
`;

const UploadArea = styled.div<{ isDragActive?: boolean }>`
  width: 100%;
  height: 100%;
  border: 2px dashed var(--primary-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.isDragActive 
    ? 'var(--secondary-color)' 
    : 'transparent'};
  opacity: ${props => props.isDragActive ? 0.8 : 1};
  padding: 16px;

  @media (max-width: 768px) {
    padding: 8px;
  }

  &:hover {
    background-color: var(--secondary-color);
    opacity: 0.8;
  }
`;

const UploadText = styled.p`
  color: var(--primary-color);
  font-size: 1.1rem;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  &.secondary {
    font-size: 0.9rem;
    opacity: 0.8;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const UploadIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--background-color);
  font-size: 24px;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    margin-bottom: 12px;
    font-size: 20px;
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 12px;
  border: 2px solid var(--primary-color);
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 0 16px;
  z-index: 2;
`;

const ActionButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  height: 40px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: var(--secondary-color);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.8rem;
    height: 36px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const ImageRectangle: React.FC = () => {
  const { colors } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleClick = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, []);

  const handleSave = useCallback(async () => {
    if (selectedImage) {
      try {
        await saveImageToDB(selectedImage);
        setToastMessage('Image saved successfully!');
        setShowToast(true);
      } catch (error) {
        console.error('Error saving image:', error);
        setToastMessage('Failed to save image. Please try again.');
        setShowToast(true);
      }
    }
  }, [selectedImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <ImageContainer>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      {selectedImage ? (
        <>
          <ImagePreview>
            <PreviewImage src={selectedImage} alt="Selected" />
            <ButtonContainer>
              <ActionButton onClick={handleChangeImage}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"/>
                </svg>
                Change Image
              </ActionButton>
              <ActionButton onClick={handleSave}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                </svg>
                Save Image
              </ActionButton>
            </ButtonContainer>
          </ImagePreview>
        </>
      ) : (
        <UploadArea
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          isDragActive={isDragActive}
        >
          <UploadIcon>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </UploadIcon>
          <UploadText>Click to upload an image</UploadText>
        </UploadArea>
      )}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </ImageContainer>
  );
};

export default ImageRectangle;