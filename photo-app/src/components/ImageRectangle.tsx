import { useState, useRef } from 'react';
import styled from '@emotion/styled';

const RectangleContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background: #242424;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 300px;
  background: #1a1a1a;
  border: 2px dashed #646cff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    border-color: #00ffd1;
    box-shadow: 0 0 15px rgba(0, 255, 209, 0.3);
  }
`;

const UploadText = styled.p`
  color: #646cff;
  font-size: 1.2rem;
  text-align: center;
  margin: 0;
`;

const ImageDisplay = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageRectangle = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <RectangleContainer>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <ImagePreview onClick={handleClick}>
        {image ? (
          <ImageDisplay src={image} alt="Preview" />
        ) : (
          <UploadText>Click to upload an image</UploadText>
        )}
      </ImagePreview>
    </RectangleContainer>
  );
};

export default ImageRectangle;