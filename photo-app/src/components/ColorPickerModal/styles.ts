import styled from "@emotion/styled";

export const SidePanel = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--background-color);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  border: 1px solid var(--primary-color);
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
`;

export const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ColorInput = styled.input`
  width: 48px;
  height: 48px;
  padding: 0;
  border: 2px solid var(--secondary-color);
  border-radius: 8px;
  cursor: pointer;
  background-color: transparent;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  color: var(--text-color);
  min-width: 100px;
  text-transform: capitalize;
`;

export const Title = styled.h3`
  color: var(--primary-color);
  margin: 0 0 24px 0;
  font-size: 1.2rem;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 4px;
  font-size: 1.5rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--secondary-color);
    color: var(--primary-color);
  }
`;
