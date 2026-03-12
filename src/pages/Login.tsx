import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface RtkError {
  status: number;
  data: {
    message: string;
    success: boolean;
    error?: unknown;
  };
}

function isRtkError(error: unknown): error is RtkError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof (error as { data: unknown }).data === 'object' &&
    (error as { data: unknown }).data !== null &&
    'message' in ((error as { data: unknown }).data as { message: unknown })
  );
}

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging in...');
    try {
      const res = await login(data).unwrap();
      dispatch(setUser({ user: res.data.user, token: res.data.token }));
      toast.success('Logged in successfully!', { id: toastId });
      navigate('/');
    } catch (error) {
      toast.dismiss(toastId);

      if (isRtkError(error)) {
        const errorMessage = error.data.message;
        
        if (errorMessage.includes('blocked')) {
            toast.error('Your account is blocked.');
            navigate('/account-status', { state: { status: 'Blocked' } });
        } else if (errorMessage.includes('Invalid credentials')) {
            toast.error('Incorrect email or password. Please try again.');
        } else {
            toast.error(errorMessage);
        }
      } else {
        toast.error('Failed to login. An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login to RideX</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;