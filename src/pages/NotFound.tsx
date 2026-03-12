import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
      <div className="max-w-md">
        <h1 className="text-9xl font-bold text-indigo-600 dark:text-indigo-400">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800 dark:text-gray-200">Page Not Found</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Sorry, the page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link 
          to="/" 
          className="mt-8 inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;