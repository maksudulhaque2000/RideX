const ServicesSection = () => {
    return (
        <div className="py-16 dark:text-white">
             <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">Our Services</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 border rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">For Riders</h3>
                        <p>Quick, safe, and affordable rides at your fingertips.</p>
                    </div>
                     <div className="p-6 border rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">For Drivers</h3>
                        <p>Flexible working hours and competitive earnings.</p>
                    </div>
                     <div className="p-6 border rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Admin Control</h3>
                        <p>Manage users, oversee rides, and get analytics.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ServicesSection;