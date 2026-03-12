import { useGetActiveRideAsRiderQuery } from "../../../redux/features/ride/rideApi";
import Swal from 'sweetalert2';
import Skeleton from "../../../components/ui/Skeleton";

const ActiveRideRider = () => {
    const { data, isLoading } = useGetActiveRideAsRiderQuery(undefined, { pollingInterval: 5000 });
    const ride = data?.data;

    const handleSOS = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            Swal.fire({
                title: 'SOS Activated!',
                html: `Your current location is being shared with emergency contacts.<br/>Coordinates: <strong>${latitude.toFixed(4)}, ${longitude.toFixed(4)}</strong>`,
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }, () => {
            Swal.fire('Location Error', 'Could not get your location. Please enable location services in your browser.', 'error');
        });
    }

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
                <p className="mt-2 dark:text-gray-300">You do not have any ongoing rides. You can request one from the "Request a Ride" page.</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Your Active Ride</h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Current Status</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold capitalize text-xl">{ride.status.replace('_', ' ')}</p>
                </div>
                
                <div className="border-t dark:border-gray-700 pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Driver Information</h3>
                    <p className="text-gray-600 dark:text-gray-300"><strong>Name:</strong> {ride.driverId?.name || 'N/A'}</p>
                    <p className="text-gray-600 dark:text-gray-300"><strong>Vehicle:</strong> {ride.driverId?.vehicleDetails || 'N/A'}</p>
                </div>

                <div className="border-t dark:border-gray-700 pt-4">
                     <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Trip Details</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400"><strong>From:</strong> {ride.pickupLocation.coordinates.join(', ')}</p>
                     <p className="text-sm text-gray-500 dark:text-gray-400"><strong>To:</strong> {ride.destinationLocation.coordinates.join(', ')}</p>
                </div>
            </div>

            <button 
                onClick={handleSOS}
                className="fixed bottom-10 right-10 bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-red-700 animate-pulse">
                SOS
            </button>
        </div>
    );
};

export default ActiveRideRider;