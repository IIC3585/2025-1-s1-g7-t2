import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'custom';
type ColorScheme = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
};

interface ThemeContextType {
  theme: Theme;
  colors: ColorScheme;
  setTheme: (theme: Theme) => void;
  setColors: (colors: ColorScheme) => void;
}

const lightColors: ColorScheme = {
  primary: '#2196f3',
  secondary: '#f50057',
  background: '#ffffff',
  text: '#000000',
};

const darkColors: ColorScheme = {
  primary: '#64b5f6',
  secondary: '#ff4081',
  background: '#121212',
  text: '#ffffff',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [colors, setColors] = useState<ColorScheme>(lightColors);

  useEffect(() => {
    // Load saved theme and colors from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColors = localStorage.getItem('colors');
    
    if (savedTheme) setThemeState(savedTheme);
    if (savedColors) setColors(JSON.parse(savedColors));
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    // Update colors based on theme
    if (newTheme === 'light') {
      setColors(lightColors);
    } else if (newTheme === 'dark') {
      setColors(darkColors);
    }
    // For custom theme, keep existing colors
  };

  useEffect(() => {
    // Save theme and colors to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('colors', JSON.stringify(colors));

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply colors to CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value);
    });

    // Apply background and text colors to body
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
  }, [theme, colors]);

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, setColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 