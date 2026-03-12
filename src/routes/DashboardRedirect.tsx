import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import Skeleton from '../components/ui/Skeleton';
import DashboardHome from '../pages/dashboard/DashboardHome';

const DashboardRedirect = () => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return (
        <div className="p-4">
            <Skeleton className="h-10 w-1/3 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
            </div>
            <Skeleton className="h-96 w-full" />
        </div>
    );
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }
  if (user.role === 'rider') {
    return <DashboardHome />;
  }
  if (user.role === 'driver') {
    return <DashboardHome />;
  }
  
  return <div>Welcome! Please navigate using the sidebar.</div>;
};

export default DashboardRedirect;