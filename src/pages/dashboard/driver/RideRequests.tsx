import Skeleton from "../../../components/ui/Skeleton";
import { useGetPendingRequestsQuery, useAcceptRideMutation, useRejectRideMutation } from "../../../redux/features/ride/rideApi";
import { toast } from 'react-hot-toast';

type TRideRequest = {
  _id: string;
  riderId: { name: string };
  pickupLocation: { coordinates: [number, number] };
  destinationLocation: { coordinates: [number, number] };
  fare: number;
};

const RideRequests = () => {
  const { data, isLoading, isError, error } = useGetPendingRequestsQuery(undefined, {
      pollingInterval: 5000,
  });
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();

  const handleAcceptRide = async (rideId: string) => {
    const toastId = toast.loading("Accepting ride...");
    try {
        await acceptRide(rideId).unwrap();
        toast.success("Ride accepted successfully!", { id: toastId });
    } catch {
        toast.error("Failed to accept ride.", { id: toastId });
    }
  }

  const handleRejectRide = async (rideId: string) => {
    const toastId = toast.loading("Rejecting ride...");
    try {
        await rejectRide(rideId).unwrap();
        toast.success("Ride rejected successfully!", { id: toastId });
    } catch {
        toast.error("Failed to reject ride.", { id: toastId });
    }
  }

  if (isLoading) return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          <Skeleton className="h-8 w-64" />
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="mt-4 flex justify-end gap-2 pt-2">
                <Skeleton className="h-7 w-16 rounded" />
                <Skeleton className="h-7 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
  );
  if (isError) {
    if (error && 'status' in error && error.status === 403) {
        return (
            <div className="p-4 text-center">
                <div className="bg-yellow-100 dark:bg-gray-800 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-6 rounded-md shadow-md max-w-md mx-auto">
                    <h2 className="font-bold text-xl mb-2">You are Currently Offline</h2>
                    <p>Please use the toggle in the sidebar to go online and start receiving ride requests.</p>
                </div>
            </div>
        );
    }
    return <div>Error loading requests. Please try again later.</div>;
  }

  const requests = data?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Incoming Ride Requests</h1>
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((ride: TRideRequest) => (
            <div key={ride._id} className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
              <h3 className="font-semibold dark:text-white">Rider: {ride.riderId?.name || 'N/A'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                From: {ride.pickupLocation.coordinates.join(', ')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                To: {ride.destinationLocation.coordinates.join(', ')}
              </p>
              <p className="mt-2 font-bold text-lg text-green-600 dark:text-green-400">
                  Offered Fare: ${ride.fare.toFixed(2)}
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button 
                    onClick={() => handleRejectRide(ride._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Reject
                </button>
                <button 
                    onClick={() => handleAcceptRide(ride._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="dark:text-gray-300">No pending ride requests at the moment.</p>
      )}
    </div>
  );
};

export default RideRequests;