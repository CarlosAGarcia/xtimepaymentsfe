// src/App.js
import MainProvider from './contexts/MainProvider';
import AppRoutes from './routes/Routes';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <MainProvider>
        <AppRoutes />
      </MainProvider>

      </ThemeProvider>
    </div>
  );
}

export default App;