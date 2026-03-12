import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, selectCurrentUser } from '../redux/features/auth/authSlice';
import ThemeToggle from '../components/ui/ThemeToggle';
import defaultAvatar from '../assets/user.jpg';

const Navbar = () => {
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully!");
        setIsMenuOpen(false);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <NavLink to="/" className="text-2xl font-bold text-indigo-600 dark:text-white">
                    RideX
                </NavLink>

                <ul className="hidden md:flex items-center space-x-6">
                    <li><NavLink to="/" className="text-gray-600 hover:text-indigo-600 dark:text-white">Home</NavLink></li>
                    <li><NavLink to="/about" className="text-gray-600 hover:text-indigo-600 dark:text-white">About</NavLink></li>
                    <li><NavLink to="/contact" className="text-gray-600 hover:text-indigo-600 dark:text-white">Contact</NavLink></li>
                    <li><NavLink to="/faq" className="text-gray-600 hover:text-indigo-600 dark:text-white">F&Q</NavLink></li>
                    {user && (
                        <li><NavLink to="/dashboard" className="text-gray-600 hover:text-indigo-600 dark:text-white">Dashboard</NavLink></li>
                    )}
                </ul>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Logout</button>
                                <NavLink to="/dashboard/profile">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                        src={user.profileImage || defaultAvatar}
                                        alt="User profile"
                                    />
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="text-gray-600 hover:text-indigo-600 dark:text-white">Login</NavLink>
                                <NavLink to="/register" className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">Register</NavLink>
                            </>
                        )}
                    </div>

                    <ThemeToggle />

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                            {user ? (
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={user.profileImage || defaultAvatar}
                                    alt="Open menu"
                                />
                            ) : (
                                <svg className="w-6 h-6 text-gray-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-col items-center p-4 space-y-4">
                        <li><NavLink to="/" className="text-gray-600 hover:text-indigo-600 dark:text-white" onClick={closeMenu}>Home</NavLink></li>
                        <li><NavLink to="/about" className="text-gray-600 hover:text-indigo-600 dark:text-white" onClick={closeMenu}>About</NavLink></li>
                        <li><NavLink to="/contact" className="text-gray-600 hover:text-indigo-600 dark:text-white" onClick={closeMenu}>Contact</NavLink></li>
                        <li><NavLink to="/faq" className="text-gray-600 hover:text-indigo-600 dark:text-white" onClick={closeMenu}>F&Q</NavLink></li>
                        {user ? (
                            <>
                                <li><NavLink to="/dashboard" className="text-gray-600 hover:text-indigo-600 dark:text-white" onClick={closeMenu}>Dashboard</NavLink></li>
                                <li><NavLink to="/dashboard/profile" className="text-gray-600 hover:text-indigo-600 dark:text-white" onClick={closeMenu}>Profile</NavLink></li>
                                <li><button onClick={handleLogout} className="bg-red-500 text-white w-full px-4 py-2 rounded-md hover:bg-red-600">Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/login" className="text-gray-600 hover:text-indigo-600 dark:text-white" onClick={closeMenu}>Login</NavLink></li>
                                <li><NavLink to="/register" className="bg-indigo-600 text-white w-full text-center px-4 py-2 rounded-md hover:bg-indigo-700" onClick={closeMenu}>Register</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;