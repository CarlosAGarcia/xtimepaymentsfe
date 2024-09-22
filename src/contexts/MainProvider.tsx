import React, { ReactNode } from 'react';
// import { DataProvider } from './DataProvider';
import { AuthContextProvider } from './auth/authContext';

const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // <DataProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    // </DataProvider>
  );
};

export default MainProvider;