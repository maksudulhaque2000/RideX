const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            About RideX
          </h1>
          <p className="text-lg mb-8">
            RideX is a modern ride-sharing platform dedicated to providing safe, reliable, and affordable transportation for everyone. Our mission is to connect riders with trusted drivers, making travel easier and more efficient.
          </p>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="max-w-2xl mx-auto text-lg">
            We aim to revolutionize urban mobility by leveraging technology to create a seamless transportation experience. We are committed to safety, transparency, and building a community of respected riders and drivers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;