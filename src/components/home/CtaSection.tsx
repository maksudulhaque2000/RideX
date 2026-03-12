import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentToken } from '../../redux/features/auth/authSlice';

const CtaSection = () => {
    // Redux store থেকে টোকেন নেওয়া হচ্ছে
    const token = useAppSelector(selectCurrentToken);

    // টোকেন আছে কিনা তার উপর ভিত্তি করে বাটন এবং লিঙ্ক পরিবর্তন করা হচ্ছে
    const buttonText = token ? 'Contact Now' : 'Sign Up Now';
    const destination = token ? '/contact' : '/register';

    return (
        <div className="py-20 bg-indigo-600 text-white dark:bg-gray-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    {token ? 'Have a Question?' : 'Ready to Get Started?'}
                </h2>
                <p className="mb-8">
                    {token ? 'Feel free to reach out to us.' : 'Join the RideX community today as a rider or a driver.'}
                </p>
                <Link 
                    to={destination} // পরিবর্তন এখানে
                    className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
                >
                    {buttonText} {/* পরিবর্তন এখানে */}
                </Link>
            </div>
        </div>
    )
}

export default CtaSection;