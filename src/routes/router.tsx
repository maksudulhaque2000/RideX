import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import UserManagement from '../pages/dashboard/admin/UserManagement';
import DashboardRedirect from './DashboardRedirect';
import RequestRide from '../pages/dashboard/rider/RequestRide';
import RideHistory from '../pages/dashboard/common/RideHistory';
import RideRequests from '../pages/dashboard/driver/RideRequests';
import ActiveRide from '../pages/dashboard/driver/ActiveRide';
import Profile from '../pages/dashboard/common/Profile';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Earnings from '../pages/dashboard/driver/Earnings';
import Faq from '../pages/Faq';
import PersistLogin from '../layouts/PersistLogin';
import RideOversight from '../pages/dashboard/admin/RideOversight';
import AccountStatusPage from '../pages/AccountStatusPage';
import ActiveRideRider from '../pages/dashboard/rider/ActiveRideRider';
import DriverManagement from '../pages/dashboard/admin/DriverManagement';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
    path: '/',
    element: <MainLayout />,
    children: [ 
      { path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
          path: 'faq',
          element: <Faq />,
      },
      { 
          path: 'login', 
          element: <Login /> 
      },
      {   path: 'register', 
          element: <Register /> 
      },
      {   path: 'account-status',
          element: <AccountStatusPage /> 
      },
      {
          path: '*',
          element: <NotFound />,
      },
     ],
  },
  {
    path: '/dashboard',
    element: ( <PrivateRoute> <DashboardLayout /> </PrivateRoute> ),
    children: [
      {
        index: true,
        element: <DashboardRedirect />,
      },
      {
        path: 'user-management',
        element: <UserManagement />,
      },
      {
          path: 'driver-approvals',
          element: <DriverManagement />,
        },
      {
          path: 'ride-oversight',
          element: <RideOversight />,
      },
      {
        path: 'request-ride',
        element: <RequestRide />,
      },
      {
        path: 'ride-history',
        element: <RideHistory />,
      },
      {
        path: 'ride-requests',
        element: <RideRequests />,
      },
      {
        path: 'active-ride',
        element: <ActiveRide />,
      },
      {
        path: 'active-ride-rider',
        element: <ActiveRideRider />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
          path: 'earnings',
          element: <Earnings />,
      },
      {
          path: '*',
          element: <NotFound />,
      },
    ],
  },
  
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);