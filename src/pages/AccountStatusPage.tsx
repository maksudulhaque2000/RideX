import { useLocation, Link } from 'react-router-dom';

const AccountStatusPage = () => {
    const location = useLocation();
    const status = location.state?.status || 'Restricted';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Account {status}</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Your account has been temporarily {status.toLowerCase()}. You do not have permission to access the dashboard at this time.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                    If you believe this is a mistake, please contact our support team at <a href="mailto:support@ridex.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">support@ridex.com</a>.
                </p>
                <Link to="/" className="mt-8 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default AccountStatusPage;