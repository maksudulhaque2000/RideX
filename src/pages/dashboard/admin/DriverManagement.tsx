import { useState } from 'react';
import { useGetAllDriversQuery, useManageDriverApprovalMutation } from '../../../redux/features/admin/adminApi';
import Skeleton from '../../../components/ui/Skeleton';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

type TDriver = {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
    };
    approvalStatus: 'pending' | 'approved' | 'suspended';
};

const DriverManagement = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetAllDriversQuery({ page });
    const [manageDriverApproval] = useManageDriverApprovalMutation();

    const drivers = data?.data || [];
    const meta = data?.meta;

    const handleApprovalStatus = (driver: TDriver, newStatus: 'approved' | 'suspended') => {
        MySwal.fire({
            title: 'Are you sure?',
            text: `You are about to ${newStatus} the driver "${driver.userId.name}".`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes, ${newStatus} it!`,
        }).then((result) => {
            if (result.isConfirmed) {
                const performAction = async () => {
                    const toastId = toast.loading(`Updating status to ${newStatus}...`);
                    try {
                        await manageDriverApproval({ driverId: driver.userId._id, status: newStatus }).unwrap();
                        toast.success("Driver status updated successfully!", { id: toastId });
                    } catch {
                        toast.error("Failed to update status.", { id: toastId });
                    }
                }
                performAction();
            }
        });
    }

    if (isLoading) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4"><Skeleton className="h-8 w-72" /></h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th className="py-2 px-4 border dark:border-gray-600">Name</th>
                                <th className="py-2 px-4 border dark:border-gray-600">Email</th>
                                <th className="py-2 px-4 border dark:border-gray-600">Approval Status</th>
                                <th className="py-2 px-4 border dark:border-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border dark:border-gray-700"><Skeleton className="h-5" /></td>
                                    <td className="py-2 px-4 border dark:border-gray-700"><Skeleton className="h-5" /></td>
                                    <td className="py-2 px-4 border dark:border-gray-700"><Skeleton className="h-5" /></td>
                                    <td className="py-2 px-4 border dark:border-gray-700"><Skeleton className="h-8" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (isError) return <div>Error loading drivers.</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Driver Approval Management</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
                    <thead className="bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="py-2 px-4 border dark:border-gray-600">Name</th>
                            <th className="py-2 px-4 border dark:border-gray-600">Email</th>
                            <th className="py-2 px-4 border dark:border-gray-600">Approval Status</th>
                            <th className="py-2 px-4 border dark:border-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver: TDriver) => (
                            <tr key={driver._id} className="dark:text-gray-300">
                                <td className="py-2 px-4 border dark:border-gray-700">{driver.userId.name}</td>
                                <td className="py-2 px-4 border dark:border-gray-700">{driver.userId.email}</td>
                                <td className="py-2 px-4 border dark:border-gray-700 capitalize">{driver.approvalStatus}</td>
                                <td className="py-2 px-4 border dark:border-gray-700 space-x-2">
                                    {driver.approvalStatus === 'pending' && (
                                        <button onClick={() => handleApprovalStatus(driver, 'approved')} className="px-2 py-1 text-xs rounded bg-green-500 text-white">
                                            Approve
                                        </button>
                                    )}
                                    {driver.approvalStatus === 'approved' && (
                                        <button onClick={() => handleApprovalStatus(driver, 'suspended')} className="px-2 py-1 text-xs rounded bg-yellow-500 text-white">
                                            Suspend
                                        </button>
                                    )}
                                     {driver.approvalStatus === 'suspended' && (
                                        <button onClick={() => handleApprovalStatus(driver, 'approved')} className="px-2 py-1 text-xs rounded bg-blue-500 text-white">
                                            Re-approve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={!meta || meta.page === 1}
                    className="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-600 dark:text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2 dark:text-gray-300">
                    Page {meta?.page} of {meta?.totalPages}
                </span>
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

export default DriverManagement;