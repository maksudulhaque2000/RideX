import { useGetMyDriverProfileQuery, useUpdateAvailabilityMutation } from "../../redux/features/driver/driverApi";
import { toast } from 'react-hot-toast';

const AvailabilityToggle = () => {
    const { data, isLoading } = useGetMyDriverProfileQuery(undefined);
    const [updateAvailability] = useUpdateAvailabilityMutation();

    const currentStatus = data?.data?.availability;

    const handleToggle = async () => {
        const newStatus = currentStatus === 'online' ? 'offline' : 'online';
        const toastId = toast.loading(`Going ${newStatus}...`);
        try {
            await updateAvailability({ availability: newStatus }).unwrap();
            toast.success(`You are now ${newStatus}`, { id: toastId });
        } catch {
            toast.error("Failed to update status", { id: toastId });
        }
    };

    if (isLoading) {
        return <div className="h-10 bg-gray-700 rounded-md animate-pulse w-full"></div>;
    }

    const isOnline = currentStatus === 'online';

    return (
        <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-center text-gray-300 mb-2">Your Status</p>
            <button
                onClick={handleToggle}
                className={`w-full font-bold py-2 px-4 rounded-md transition-colors ${
                    isOnline 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
            >
                {isOnline ? 'You are Online' : 'You are Offline'}
            </button>
        </div>
    );
};

export default AvailabilityToggle;