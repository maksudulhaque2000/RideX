import { useState, useEffect } from 'react';
import { useGetUsersQuery, useManageUserBlockStatusMutation, useManageUserRoleMutation } from '../../../redux/features/admin/adminApi';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Skeleton from '../../../components/ui/Skeleton';

const MySwal = withReactContent(Swal);

type TUser = {
    _id: string;
    name: string;
    email: string;
    role: 'rider' | 'driver' | 'admin';
    isBlocked: boolean;
};

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

    const useDebounced = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);
        return debouncedValue;
    };
  const debouncedSearchTerm = useDebounced(searchTerm, 500);


  const { data, isLoading } = useGetUsersQuery({ page, role: roleFilter, searchTerm: debouncedSearchTerm });
  const [manageUserBlockStatus] = useManageUserBlockStatusMutation();
  const [manageUserRole] = useManageUserRoleMutation();

  const users = data?.data || [];
  const meta = data?.meta;

  const handleAction = (action: () => void, confirmText: string, actionText: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: confirmText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionText}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        action();
      }
    });
  };

  const handleBlock = (user: TUser) => {
    handleAction(
      async () => {
        const toastId = toast.loading("Updating status...");
        await manageUserBlockStatus({ userId: user._id, isBlocked: !user.isBlocked });
        toast.success("Status updated!", { id: toastId });
      },
      `You are about to ${user.isBlocked ? 'unblock' : 'block'} ${user.name}.`,
      `${user.isBlocked ? 'Unblock' : 'Block'}`
    );
  };

  const handleRoleChange = (user: TUser, newRole: 'admin' | 'rider') => {
      handleAction(
          async () => {
              const toastId = toast.loading("Updating role...");
              await manageUserRole({ userId: user._id, role: newRole });
              toast.success("Role updated!", { id: toastId });
          },
          `You are about to make ${user.name} an ${newRole}.`,
          `Confirm`
      )
  }

  if (isLoading) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4"><Skeleton className="h-8 w-64" /></h1>
            <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-10 w-48" />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border dark:bg-gray-800">
                    <thead className="bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Role</th>
                            <th className="py-2 px-4 border">Status</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, i) => (
                            <tr key={i}>
                                <td className="py-2 px-4 border"><Skeleton className="h-5" /></td>
                                <td className="py-2 px-4 border"><Skeleton className="h-5" /></td>
                                <td className="py-2 px-4 border"><Skeleton className="h-5" /></td>
                                <td className="py-2 px-4 border"><Skeleton className="h-5" /></td>
                                <td className="py-2 px-4 border space-x-1"><Skeleton className="h-8" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">User Management</h1>
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full md:w-auto p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
            <option value="">Filter by All Roles</option>
            <option value="rider">Riders</option>
            <option value="driver">Drivers</option>
            <option value="admin">Admins</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 border dark:border-gray-600">Name</th>
              <th className="py-2 px-4 border dark:border-gray-600">Email</th>
              <th className="py-2 px-4 border dark:border-gray-600">Role</th>
              <th className="py-2 px-4 border dark:border-gray-600">Status</th>
              <th className="py-2 px-4 border dark:border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: TUser) => (
              <tr key={user._id} className="dark:text-gray-300">
                <td className="py-2 px-4 border dark:border-gray-700">{user.name}</td>
                <td className="py-2 px-4 border dark:border-gray-700">{user.email}</td>
                <td className="py-2 px-4 border dark:border-gray-700 capitalize">{user.role}</td>
                <td className="py-2 px-4 border dark:border-gray-700">{user.isBlocked ? 'Blocked' : 'Active'}</td>
                <td className="py-2 px-4 border dark:border-gray-700 space-x-1">
                  <button onClick={() => handleBlock(user)} className={`px-2 py-1 text-xs rounded text-white ${user.isBlocked ? 'bg-green-500' : 'bg-red-500'}`}>
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  {user.role === 'admin' ? (
                    <button onClick={() => handleRoleChange(user, 'rider')} className="px-2 py-1 text-xs rounded bg-yellow-500 text-white">Remove Admin</button>
                  ) : (
                    <button onClick={() => handleRoleChange(user, 'admin')} className="px-2 py-1 text-xs rounded bg-blue-500 text-white">Make Admin</button>
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
export default UserManagement;