import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { useEffect } from 'react';
import { logout, setUser } from '../redux/features/auth/authSlice';
import { useGetMyProfileQuery } from '../redux/features/auth/authApi';
import { toast } from 'react-hot-toast';
import Skeleton from '../components/ui/Skeleton';

const PersistLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const localToken = localStorage.getItem('token');
    
    const { data: userData, isLoading, isError } = useGetMyProfileQuery(undefined, {
        skip: !localToken,
    });

    useEffect(() => {
        if (userData?.data && localToken) {
            dispatch(setUser({ user: userData.data, token: localToken }));
        }
        if (isError && localToken) {
            dispatch(logout());
            toast.error("Session expired. Please log in again.");
        }
    }, [userData, localToken, isError, dispatch, navigate]);
    
    if (isLoading && localToken) {
        return (
            <div className="dark:bg-gray-900">
                {/* Navbar Skeleton */}
                <div className="bg-white dark:bg-gray-800 shadow-md">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                        <Skeleton className="h-8 w-24" />
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-8 w-24 rounded-md" />
                        </div>
                    </div>
                </div>
                
                <div className="bg-indigo-700 dark:bg-gray-800">
                    <div className="container mx-auto px-4 py-24 text-center">
                        <Skeleton className="h-10 md:h-14 w-3/4 mx-auto mb-4" />
                        <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
                        <Skeleton className="h-12 w-40 mx-auto rounded-full" />
                    </div>
                </div>
                
                <div className="container mx-auto px-4 py-16">
                    <Skeleton className="h-10 w-1/3 mx-auto mb-12" />
                    <div className="grid md:grid-cols-3 gap-8">
                        <Skeleton className="h-40 rounded-lg" />
                        <Skeleton className="h-40 rounded-lg" />
                        <Skeleton className="h-40 rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

    return <Outlet />;
};

export default PersistLogin;