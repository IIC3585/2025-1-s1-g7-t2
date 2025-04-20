import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeCustomizer: React.FC = () => {
  const { theme, colors, setTheme, setColors } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'custom') => {
    setTheme(newTheme);
  };

  const handleColorChange = (colorKey: keyof typeof colors, value: string) => {
    setColors({
      ...colors,
      [colorKey]: value
    });
  };

  return (
    <div className="theme-controls">
      <div>
        <label>Theme: </label>
        <select 
          value={theme} 
          onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'custom')}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {theme === 'custom' && (
        <div className="color-picker">
          <div>
            <label>Primary: </label>
            <input
              type="color"
              value={colors.primary}
              onChange={(e) => handleColorChange('primary', e.target.value)}
            />
          </div>
          <div>
            <label>Secondary: </label>
            <input
              type="color"
              value={colors.secondary}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
            />
          </div>
          <div>
            <label>Background: </label>
            <input
              type="color"
              value={colors.background}
              onChange={(e) => handleColorChange('background', e.target.value)}
            />
          </div>
          <div>
            <label>Text: </label>
            <input
              type="color"
              value={colors.text}
              onChange={(e) => handleColorChange('text', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}; 