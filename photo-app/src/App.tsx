import styled from '@emotion/styled';
import ImageRectangle from './components/ImageRectangle';

const AppContainer = styled.div`
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #646cff;
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-in;

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
    <AppContainer>
      <Title>Tarea 2 - PWA with WASM Demo</Title>
      <ImageRectangle />
    </AppContainer>
  );
}

export default App;