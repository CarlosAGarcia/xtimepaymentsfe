// src/routes/RestrictedRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import RestrictedLayout from './restrictedPages/RestrictedLayout';

interface RestrictedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ isLoggedIn, children }) => {
  return isLoggedIn ? (
    <RestrictedLayout>{children}</RestrictedLayout>
  ) : (
    <Navigate to="/" />
  );
};

export default RestrictedRoute;