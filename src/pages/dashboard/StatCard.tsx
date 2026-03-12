type TStatCardProps = {
  title: string;
  value: string | number | undefined;
};

const StatCard = ({ title, value }: TStatCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value ?? 'N/A'}</p>
    </div>
  );
};

export default StatCard;