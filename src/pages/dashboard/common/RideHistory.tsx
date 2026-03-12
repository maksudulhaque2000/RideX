import { useGetRideHistoryQuery } from "../../../redux/features/ride/rideApi";
import Skeleton from "../../../components/ui/Skeleton";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useState } from "react";

type TRide = {
    _id: string;
    pickupLocation: { coordinates: [number, number] };
    destinationLocation: { coordinates: [number, number] };
    status: 'pending' | 'accepted' | 'completed' | 'cancelled';
    createdAt: string;
    fare?: number;
};

const RideHistory = () => {
  const user = useAppSelector(selectCurrentUser);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  
  const { data, isLoading, isError } = useGetRideHistoryQuery({ 
      role: user?.role, 
      page, 
      status: statusFilter 
    }, {
    skip: !user,
  });

  if (isLoading || !user) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          <Skeleton className="h-8 w-48" />
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-4 border dark:border-gray-600">Date</th>
                <th className="py-2 px-4 border dark:border-gray-600">Pickup Location</th>
                <th className="py-2 px-4 border dark:border-gray-600">Destination</th>
                <th className="py-2 px-4 border dark:border-gray-600">Status</th>
                <th className="py-2 px-4 border dark:border-gray-600">Fare</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <Skeleton className="h-5 w-24" />
                  </td>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <Skeleton className="h-5 w-40" />
                  </td>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <Skeleton className="h-5 w-40" />
                  </td>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <Skeleton className="h-5 w-16" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isError) return <div>Failed to load ride history.</div>;

  const rides = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">My Ride History</h1>
      <div className="mb-4">
        <label className="mr-2 dark:text-gray-300">Filter by Status:</label>
        <select 
            value={statusFilter} 
            onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
            }}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
            <option value="">All</option>
            <option value="requested">Requested</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Date</th>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Pickup Location</th>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Destination</th>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Status</th>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Fare</th>
            </tr>
          </thead>
          <tbody>
            {rides.length > 0 ? (
              rides.map((ride: TRide) => (
                <tr key={ride._id} className="dark:text-gray-300">
                  <td className="py-2 px-4 border dark:border-gray-700">{new Date(ride.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{ride.pickupLocation.coordinates.join(', ')}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{ride.destinationLocation.coordinates.join(', ')}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <span className="px-2 py-1 capitalize text-xs font-semibold rounded-full bg-blue-200 text-blue-800">
                      {ride.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border dark:border-gray-700 font-medium">${ride.fare?.toFixed(2) || '0.00'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 dark:text-gray-300">No ride history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!meta || meta.page === 1}
            className="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-600 dark:text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 dark:text-gray-300">Page {meta?.page} of {meta?.totalPages}</span>
          <button
             onClick={() => setPage(page + 1)}
             disabled={!meta || meta.page === meta.totalPages}
            className="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-600 dark:text-white rounded disabled:opacity-50"
          >
            Next
          </button>
       </div>
    </div>
  );
};

export default RideHistory;