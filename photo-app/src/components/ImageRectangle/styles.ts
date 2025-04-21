import styled from "@emotion/styled";

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 16/9;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    aspect-ratio: 4/3;
  }
`;

export const UploadArea = styled.div<{ isDragActive?: boolean }>`
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
  background-color: ${(props) =>
    props.isDragActive ? "var(--secondary-color)" : "transparent"};
  opacity: ${(props) => (props.isDragActive ? 0.8 : 1)};
  padding: 16px;

  @media (max-width: 768px) {
    padding: 8px;
  }

  &:hover {
    background-color: var(--secondary-color);
    opacity: 0.8;
  }
`;

export const UploadText = styled.p`
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

export const UploadIcon = styled.div`
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

export const ImagePreview = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 12px;
  border: 2px solid var(--primary-color);
  overflow: hidden;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ButtonContainer = styled.div`
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

export const FiltersButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem;
  scrollbar-width: thin; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;


export const ActionButton = styled.button`
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

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    transform: none;
    opacity: 0.7;
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
