import { useGetActiveRideAsDriverQuery, useUpdateRideStatusMutation } from "../../../redux/features/ride/rideApi";
import { toast } from 'react-hot-toast';
import Skeleton from "../../../components/ui/Skeleton";

const ActiveRide = () => {
  const { data, isLoading } = useGetActiveRideAsDriverQuery(undefined, {
    pollingInterval: 5000, 
  });
  const [updateRideStatus] = useUpdateRideStatusMutation();

  const ride = data?.data;

  const handleUpdateStatus = async (status: string) => {
    if (!ride?._id) return;
    const toastId = toast.loading(`Updating status to ${status}...`);
    try {
      await updateRideStatus({ rideId: ride._id, status }).unwrap();
      toast.success("Status updated successfully!", { id: toastId });
    } catch {
      toast.error("Failed to update status.", { id: toastId });
    }
  };

  if (isLoading) {
    return (
        <div className="p-4">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-64 w-full max-w-2xl rounded-lg" />
        </div>
    );
  }

  if (!ride) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold dark:text-white">No Active Ride</h1>
        <p className="mt-4 dark:text-gray-300">You do not have any ongoing rides at the moment.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Active Ride Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 max-w-2xl space-y-4">
        
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Rider Information</h3>
            <p className="dark:text-gray-300"><strong>Name:</strong> {ride.riderId?.name || 'N/A'}</p>
        </div>

        <div className="border-t dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Current Status</h3>
            <p className="font-semibold capitalize text-xl text-indigo-600 dark:text-indigo-400">{ride.status.replace('_', ' ')}</p>
        </div>
        
        <div className="border-t dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Trip Details</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>From (Pickup):</strong> {ride.pickupLocation?.coordinates?.join(', ') || 'N/A'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>To (Destination):</strong> {ride.destinationLocation?.coordinates?.join(', ') || 'N/A'}
            </p>
        </div>

        <div className="border-t dark:border-gray-700 pt-4 flex flex-wrap gap-2">
            {ride.status === 'accepted' && (
                <button onClick={() => handleUpdateStatus('picked_up')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Mark as Picked Up
                </button>
            )}
            {ride.status === 'picked_up' && (
                <button onClick={() => handleUpdateStatus('in_transit')} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                    Mark as In Transit
                </button>
            )}
             {ride.status === 'in_transit' && (
                <button onClick={() => handleUpdateStatus('completed')} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Complete Ride
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ActiveRide;