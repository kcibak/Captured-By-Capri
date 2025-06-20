import { type ReactNode } from 'react';
import { TopNavbar } from './topnavbar';

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <TopNavbar />
    <main style={{ flex: 1, marginTop: 80, padding: '0', minHeight: '100vh' }}>
      {children}
    </main>
  </div>
);
