// src/routes/AppRoutes.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RestrictedRoute from './RestrictedRoute';
import Dashboard from './restrictedPages/Dashboard';

const isLoggedIn = true

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" 
          element={
            <RestrictedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
            </RestrictedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;