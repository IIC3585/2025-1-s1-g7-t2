import React from 'react';
import {
  SidePanel,
  ColorPickerContainer,
  ColorRow,
  ColorInput,
  Label,
  Title,
  CloseButton,
} from "./styles";
import { useTheme } from '../../contexts/ThemeContext';



interface ColorPickerModalProps {
  onClose: () => void;
}

export const ColorPickerPanel: React.FC<ColorPickerModalProps> = ({ onClose }) => {
  const { colors, setColors } = useTheme();

  const handleColorChange = (colorKey: keyof typeof colors, value: string) => {
    setColors({
      ...colors,
      [colorKey]: value
    });
  };

  return (
    <SidePanel>
      <CloseButton onClick={onClose}>×</CloseButton>
      <Title>Theme Colors</Title>
      <ColorPickerContainer>
        {Object.entries(colors).map(([key, value]) => (
          <ColorRow key={key}>
            <Label>{key}:</Label>
            <ColorInput
              type="color"
              value={value}
              onChange={(e) => handleColorChange(key as keyof typeof colors, e.target.value)}
            />
          </ColorRow>
        ))}
      </ColorPickerContainer>
    </SidePanel>
  );
};