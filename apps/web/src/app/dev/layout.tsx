import React from 'react';

interface DeveloperLayoutProps {
  children: React.ReactNode;
}

const DeveloperLayout = async ({ children }: DeveloperLayoutProps) => {
  return <>{children}</>;
};

export default DeveloperLayout;
