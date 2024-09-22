// src/routes/AppRoutes.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RestrictedRoute from './RestrictedRoute';
import Dashboard from './restrictedPages/Dashboard';
import LoginPage from './pages/LoginPage';
import ForgotPass from './pages/ForgotPass';
import SignUpPage from './pages/SignUpPage';
import VerifyPage from './pages/VerifyPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/smh" element={<ForgotPass />} />
        <Route path="/verify" element={<VerifyPage />} />

        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/dashboard" element={<RestrictedRoute component={<Dashboard/>} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;