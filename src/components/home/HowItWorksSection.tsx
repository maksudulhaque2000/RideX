const HowItWorksSection = () => {
    const steps = [
        { title: 'Request a Ride', description: 'Enter your destination and choose your ride.' },
        { title: 'Driver Arrives', description: 'Your driver arrives at your location in minutes.' },
        { title: 'Enjoy Your Trip', description: 'Sit back, relax, and enjoy a safe journey.' },
    ];
  return (
    <div className="py-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                    <div className="text-3xl font-bold text-indigo-600 mb-4">{index + 1}</div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-800">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default HowItWorksSection;