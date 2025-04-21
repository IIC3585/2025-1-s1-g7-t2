import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ColorPickerPanel } from '../ColorPickerModal';
import {
  ToggleContainer,
  Switch,
  Slider,
  CustomThemeButton,
} from './styles';

const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export const ThemeToggle: React.FC = () => {
  const { theme, colors, setTheme } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null!);

  useClickOutside(panelRef, () => setShowColorPicker(false));

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleCustomTheme = () => {
    setTheme('custom');
    setShowColorPicker(!showColorPicker);
  };

  return (
    <>
      <ToggleContainer>
        <Switch>
          <input 
            type="checkbox" 
            checked={theme === 'dark'}
            onChange={handleThemeChange}
          />
          <Slider theme={theme}>
            <svg className="sun-icon" viewBox="0 0 24 24">
              <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13h2c0.55,0,1-0.45,1-1s-0.45-1-1-1H2 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13h2c0.55,0,1-0.45,1-1s-0.45-1-1-1h-2c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 S11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0 s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
            </svg>
            <svg className="moon-icon" viewBox="0 0 24 24">
              <path d="M9.5,2c-1.82,0-3.53,0.5-5,1.35c2.99,1.73,5,4.95,5,8.65s-2.01,6.92-5,8.65C5.97,21.5,7.68,22,9.5,22c5.52,0,10-4.48,10-10 S15.02,2,9.5,2z"/>
            </svg>
          </Slider>
        </Switch>
        <CustomThemeButton
          onClick={handleCustomTheme}
          colors={colors}
          title="Customize theme colors"
        />
      </ToggleContainer>
      {showColorPicker && (
        <ColorPickerPanel onClose={() => setShowColorPicker(false)} />
      )}
    </>
  );
}; 