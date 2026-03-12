import type { ReactNode } from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentToken } from '../redux/features/auth/authSlice';
import { Navigate, useLocation } from 'react-router-dom';

type TPrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: TPrivateRouteProps) => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;