const DashboardHome = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] text-center px-4">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
        🎉 Welcome to Your Dashboard 🎉
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        You are now in the <span className="font-semibold text-indigo-500">Dashboard</span>.
      </p>
      <p className="text-base text-gray-500">
        👉 Select an option from the sidebar to get started.
      </p>
      <p className="mt-6 text-sm text-gray-400 italic">
        ✨ Stay productive & manage everything from here ✨
      </p>
    </div>
  )
};

export default DashboardHome;