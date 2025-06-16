import React, { type ReactNode } from 'react';
import { SidebarNav } from './sidebarnav';

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex' }}>
    <SidebarNav />
    <main style={{ flex: 1, marginLeft: 64, padding: '2rem', minHeight: '100vh', transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)' }}>
      {children}
    </main>
  </div>
);
