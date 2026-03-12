import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;