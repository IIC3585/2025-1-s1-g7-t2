import React, { useEffect, useState } from 'react';

export const SplashScreen: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 2000); // Show splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className={`app-splash-screen ${hidden ? 'hidden' : ''}`}>
      <img 
        src="/pwa-512x512.png" 
        alt="App Logo" 
        style={{ 
          width: '200px', 
          height: '200px',
          animation: 'pulse 2s infinite'
        }} 
      />
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}; 