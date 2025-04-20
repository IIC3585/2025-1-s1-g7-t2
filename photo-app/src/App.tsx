import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { SplashScreen } from './components/SplashScreen';
import './styles/global.css';
import styled from '@emotion/styled';
import ImageRectangle from './components/ImageRectangle';
import { SavedImagesButtonComponent } from './components/SavedImagesButton';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  background-color: var(--background-color);
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 60px; // Space for the theme controls at the top

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 80px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0;
  text-align: center;
  animation: fadeIn 1s ease-in;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


function App() {
  return (
    <ThemeProvider>
      <SplashScreen />
      <AppContainer>
        <ThemeToggle />

        <SavedImagesButtonComponent />
        <MainContent>
          <Title>CropCut</Title>
          <ImageRectangle />
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;