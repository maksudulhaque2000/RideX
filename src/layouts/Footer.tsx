const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} RideX. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="mx-2 hover:text-indigo-400">Privacy Policy</a>
            <a href="#" className="mx-2 hover:text-indigo-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  };
  
export default Footer;