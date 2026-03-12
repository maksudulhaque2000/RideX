import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import AvailabilityToggle from '../pages/dashboard/AvailabilityToggle';

type TNavItem = {
  name: string;
  path: string;
};

const adminNavItems: TNavItem[] = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'User Management', path: '/dashboard/user-management' },
  { name: 'Driver Approvals', path: '/dashboard/driver-approvals' },
  { name: 'Ride Oversight', path: '/dashboard/ride-oversight' },
  { name: 'My Profile', path: '/dashboard/profile' },
];

const driverNavItems: TNavItem[] = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Active Ride', path: '/dashboard/active-ride' },
  { name: 'Ride Requests', path: '/dashboard/ride-requests' },
  { name: 'Ride History', path: '/dashboard/ride-history' },
  { name: 'Earnings', path: '/dashboard/earnings' },
  { name: 'My Profile', path: '/dashboard/profile' },
];

const riderNavItems: TNavItem[] = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Request a Ride', path: '/dashboard/request-ride' },
  { name: 'Active Ride', path: '/dashboard/active-ride-rider' },
  { name: 'Ride History', path: '/dashboard/ride-history' },
  { name: 'My Profile', path: '/dashboard/profile' },
];

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            </div>
        </aside>
    );
  }

  let navItems: TNavItem[];

  switch (user.role) {
    case 'admin':
      navItems = adminNavItems;
      break;
    case 'driver':
      navItems = driverNavItems;
      break;
    case 'rider':
      navItems = riderNavItems;
      break;
    default:
      navItems = [];
  }

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block p-2 rounded-md transition-colors ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 border-t border-gray-700 pt-4">
             <NavLink
                to="/"
                className="block p-2 rounded-md transition-colors hover:bg-gray-600"
            >
                Back to Home
            </NavLink>
        </div>
      {user.role === 'driver' && (
        <div className="mt-auto">
            <AvailabilityToggle />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;