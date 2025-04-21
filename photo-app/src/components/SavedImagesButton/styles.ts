import styled from "@emotion/styled";

export const SavedImagesButton = styled.button`
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
