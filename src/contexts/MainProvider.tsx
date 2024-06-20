import React, { ReactNode } from 'react';
// import { DataProvider } from './DataProvider';
import { UserContextProvider } from './users/users';

const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // <DataProvider>
      <UserContextProvider>
        {children}
      </UserContextProvider>
    // </DataProvider>
  );
};

export default MainProvider;