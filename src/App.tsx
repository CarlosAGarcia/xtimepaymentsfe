// src/App.js
import MainProvider from './contexts/MainProvider';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <div>
      <MainProvider>

      <AppRoutes />
      </MainProvider>

    </div>
  );
}

export default App;