// src/routes/RestrictedRoute.tsx
import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import RestrictedLayout from './restrictedPages/RestrictedLayout';
import { AuthContext } from '../contexts/auth/authContext';

interface RestrictedRouteProps {
  component: React.ReactNode;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ component }) => {
  const userContext = useContext(AuthContext);
  if (!userContext) throw new Error('YourComponent must be used within a MainProvider');
  const { accessToken } = userContext;  // <<-- why is this undefined?

  // const { accessToken } = useAuth();
  console.log('accessToken:', accessToken);
  const isLoggedIn = !!accessToken
  return isLoggedIn ? (
    <RestrictedLayout>
      {component}
    </RestrictedLayout>
  ) : (
    <Navigate to="/" />
  );
};

export default RestrictedRoute;