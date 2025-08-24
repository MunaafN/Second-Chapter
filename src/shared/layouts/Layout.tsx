import { Outlet } from 'react-router-dom';
import Header from '@/shared/components/organisms/Header';
import Sidebar from '@/shared/components/organisms/Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
