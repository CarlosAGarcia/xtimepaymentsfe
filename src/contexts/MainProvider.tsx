import React, { ReactNode } from 'react';
// import { DataProvider } from './DataProvider';
import { AuthContextProvider } from './auth/authContext';
import { OrganisationContextProvider } from './organisations/organisationContext';
import { SiteManagementProvider } from './siteManagement/siteManagementContext';

const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // <DataProvider>
   
      <AuthContextProvider>
      <OrganisationContextProvider>
      <SiteManagementProvider>
            {children}
      </SiteManagementProvider>
      </OrganisationContextProvider>
      </AuthContextProvider>
    

    // </DataProvider>
  );
};

export default MainProvider;