import Form from './components/Form';
import { Box, styled } from '@mui/material';

// Styled root container
const AppContainer = styled(Box)({
  minHeight: '100vh',
  height: '100%',
  backgroundColor: '#1E1E1E',
  color: '#1E1E1E',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function App() {
  return (
    <AppContainer>
      <Form />
    </AppContainer>
  );
}

export default App;
