import { useState } from 'react';
import { useGetAllRidesQuery } from '../../../redux/features/admin/adminApi';
import Skeleton from '../../../components/ui/Skeleton';

type TRide = {
    _id: string;
    riderId: { name: string; email: string };
    driverId: { name: string; email: string };
    status: string;
    fare?: number;
    createdAt: string;
};

const RideOversight = () => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');

    const { data, isLoading, isError } = useGetAllRidesQuery({ page, status: statusFilter });

    const rides = data?.data || [];
    const meta = data?.meta;

    if (isLoading) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4"><Skeleton className="h-8 w-64" /></h1>
                <div className="mb-4">
                    <Skeleton className="h-10 w-48" />
                </div>
                <div className="overflow-x-auto">
                    <div className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        <div>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-12 border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) return <div>Error loading rides.</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Ride Oversight</h1>

            <div className="mb-4">
                <label className="mr-2 dark:text-gray-300">Filter by Status:</label>
                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
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
                            <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Rider</th>
                            <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Driver</th>
                            <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Status</th>
                            <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Fare</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rides.map((ride: TRide) => (
                            <tr key={ride._id} className="dark:text-gray-300">
                                <td className="py-2 px-4 border dark:border-gray-700">{new Date(ride.createdAt).toLocaleString()}</td>
                                <td className="py-2 px-4 border dark:border-gray-700">{ride.riderId?.name || 'N/A'}</td>
                                <td className="py-2 px-4 border dark:border-gray-700">{ride.driverId?.name || 'N/A'}</td>
                                <td className="py-2 px-4 border dark:border-gray-700 capitalize">{ride.status}</td>
                                <td className="py-2 px-4 border dark:border-gray-700">${ride.fare?.toFixed(2) || '0.00'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-600 dark:text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2 dark:text-gray-300">Page {meta?.page} of {meta?.totalPages}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!meta || page === meta.totalPages}
                    className="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-600 dark:text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RideOversight;