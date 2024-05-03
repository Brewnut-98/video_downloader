import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div>
    <header>Header</header>
    <main>{children}</main>
  </div>
);

export default Layout;