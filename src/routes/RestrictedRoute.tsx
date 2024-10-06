// src/routes/RestrictedRoute.tsx
import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import RestrictedLayout from '../layouts/RestrictedLayout';
import { AuthContext } from '../contexts/auth/authContext';

interface RestrictedRouteProps {
  component: React.ReactNode;
  disableLayout?: boolean | undefined;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ component, disableLayout = false }) => {
  const userContext = useContext(AuthContext);
  if (!userContext) throw new Error('YourComponent must be used within a MainProvider');
  const { accessToken } = userContext;  // <<-- why is this undefined?

  const isLoggedIn = !!accessToken

  if (!isLoggedIn) return <Navigate to="/" />
  if (disableLayout) return <div>{component}</div>;
  return (
    <RestrictedLayout>
      {component}
    </RestrictedLayout>
  );

};

export default RestrictedRoute;