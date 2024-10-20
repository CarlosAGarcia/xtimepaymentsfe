// public
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import ForgotPass from './pages/ForgotPass';
import SignUpPage from './pages/SignUpPage';
import VerifyPage from './pages/VerifyPage';

// reastricted
import RestrictedRoute from './RestrictedRoute';
import Dashboard from './restrictedPages/Dashboard';
import Billing from './restrictedPages/Billing';
import Monetization from './restrictedPages/Monetization';
import SiteManagement from './restrictedPages/SiteManagement';


function AppRoutes() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/smh" element={<ForgotPass />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* RESTRICTED */}
        <Route path="/dashboard" element={<RestrictedRoute component={<Dashboard/>} />} />
        <Route path="/siteManagement" element={<RestrictedRoute component={<SiteManagement/>} />} />
        <Route path="/monetization" element={<RestrictedRoute component={<Monetization/>} />} />
        <Route path="/billing" element={<RestrictedRoute component={<Billing/>} />} />

        {/* ERROR */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;