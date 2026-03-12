import { TourProvider, useTour } from '@reactour/tour';
import type { StepType } from '@reactour/tour';
import { useEffect } from 'react';
import { useGetDashboardAnalyticsQuery } from "../../../redux/features/admin/adminApi";
import StatCard from '../StatCard';
import Skeleton from '../../../components/ui/Skeleton';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const steps: StepType[] = [
  { 
    selector: '#admin-dashboard-title', 
    content: 'Welcome to the Admin Dashboard! Here you can get a quick overview of the platform.' 
  },
  {
    selector: '#stats-grid',
    content: 'These cards show you the most important real-time statistics like total users, drivers, and revenue.'
  },
  {
    selector: '#chart-section',
    content: 'This chart provides a visual representation of the overall platform statistics.'
  },
  {
    selector: '[href="/dashboard/user-management"]',
    content: 'You can manage all riders and drivers by navigating to the User Management page.'
  },
  {
    selector: '[href="/dashboard/driver-approvals"]',
    content: 'You can manage all driver approvals by navigating to the Driver Approval page.'
  },
  {
    selector: '[href="/dashboard/ride-oversight"]',
    content: 'And here, you can oversee all the rides happening on the platform.'
  },
  {
    selector: '[href="/dashboard/profile"]',
    content: 'And here, you can manage your profile settings.'
  }
];

const AdminDashboardContent = () => {
  const { data, isLoading } = useGetDashboardAnalyticsQuery(undefined);
  const { setIsOpen } = useTour();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIsOpen]);

  if (isLoading) {
    return <div>
        <h1 className="text-3xl font-bold mb-6"><Skeleton className="h-9 w-72" /></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4"><Skeleton className="h-8 w-48" /></h2>
          <Skeleton className="h-96" />
        </div>
      </div>
  }

  const analyticsData = data?.data;

  const chartData = [
    { name: 'Total Riders', value: analyticsData?.totalRiders || 0 },
    { name: 'Total Drivers', value: analyticsData?.totalDrivers || 0 },
    { name: 'Total Rides', value: analyticsData?.totalRides || 0 },
    { name: 'Total Revenue', value: analyticsData ? Number(analyticsData.totalRevenue.toFixed(2)) : 0 },
  ];

  return (
    <div>
      <h1 id="admin-dashboard-title" className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div id="stats-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Riders" value={analyticsData?.totalRiders} />
        <StatCard title="Total Drivers" value={analyticsData?.totalDrivers} />
        <StatCard title="Total Rides" value={analyticsData?.totalRides} />
        <StatCard title="Total Revenue" value={analyticsData ? `$${analyticsData.totalRevenue.toFixed(2)}` : '$0.00'} />
      </div>

      <div id="chart-section">
        <h2 className="text-2xl font-semibold mb-4">Platform Overview (Chart)</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
    return (
        <TourProvider steps={steps}>
            <AdminDashboardContent />
        </TourProvider>
    )
}

export default AdminDashboard;
