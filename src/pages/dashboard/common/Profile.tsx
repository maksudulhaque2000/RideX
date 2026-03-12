import { useForm, type FieldValues } from 'react-hook-form';
import { useAppSelector } from '../../../redux/hooks';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import { useUpdateProfileMutation } from '../../../redux/features/user/userApi';
import { toast } from 'react-hot-toast';
import { useGetMyDriverProfileQuery } from '../../../redux/features/driver/driverApi';
import { useEffect } from 'react';
import Skeleton from '../../../components/ui/Skeleton';

const Profile = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data: driverData, isLoading: isDriverProfileLoading } = useGetMyDriverProfileQuery(undefined, {
        skip: user?.role !== 'driver',
    });

    const { register, handleSubmit, reset } = useForm();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    useEffect(() => {
        if (user) {
            const defaultValues: Record<string, unknown> = {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                profileImage: user.profileImage,
            };
            if (user.role === 'driver' && driverData?.data) {
                defaultValues.vehicleDetails = driverData.data.vehicleDetails;
                defaultValues.licenseNumber = driverData.data.licenseNumber;
            }
            reset(defaultValues);
        }
    }, [user, driverData, reset]);


    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Updating profile...");
        try {
            await updateProfile(data).unwrap();
            toast.success("Profile updated successfully!", { id: toastId });
        } catch {
            toast.error("Failed to update profile.", { id: toastId });
        }
    }
    
    if (!user || (user.role === 'driver' && isDriverProfileLoading)) {
        return (
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">
                    <Skeleton className="h-8 w-32" />
                </h1>
                <div className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    {user?.role === 'driver' && (
                        <div className="border-t dark:border-gray-700 pt-4 space-y-4">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    )}
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 dark:text-white">My Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input type="text" {...register('name')} className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address (Cannot be changed)</label>
                    <input type="email" {...register('email')} disabled className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-gray-400" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input type="text" {...register('phone')} className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <input type="text" {...register('address')} className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Image URL</label>
                    <input type="url" {...register('profileImage')} className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>

                {user.role === 'driver' && (
                    <>
                        <div className="border-t dark:border-gray-700 pt-4">
                            <h3 className="text-lg font-semibold dark:text-white mb-2">Driver Information</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Details</label>
                                <input type="text" {...register('vehicleDetails')} className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                             <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">License Number</label>
                                <input type="text" {...register('licenseNumber')} className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                        </div>
                    </>
                )}

                <button type="submit" disabled={isUpdating} className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400">
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default Profile;