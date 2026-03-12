import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Toaster } from 'react-hot-toast';


const DashboardLayout = () => {
  return (
    <div className="flex bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;