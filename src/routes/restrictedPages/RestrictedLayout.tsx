// src/components/RestrictedLayout.tsx
import React from 'react';
import NavBars from '../../components/navbar/NavBars';

interface RestrictedLayoutProps {
  children: React.ReactNode;
}

const RestrictedLayout: React.FC<RestrictedLayoutProps> = ({ children }) => {
  return (
    <div className="restricted-container">
      <NavBars/>
      <div>
        
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default RestrictedLayout;
