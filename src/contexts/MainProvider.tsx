import React, { ReactNode } from 'react';
// import { DataProvider } from './DataProvider';
import { AuthContextProvider } from './auth/authContext';
import { OrganisationContextProvider } from './organisations/organisationContext';

const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // <DataProvider>
   
      <AuthContextProvider>
         <OrganisationContextProvider>
          {children}
        </OrganisationContextProvider>
      </AuthContextProvider>
    

    // </DataProvider>
  );
};

export default MainProvider;