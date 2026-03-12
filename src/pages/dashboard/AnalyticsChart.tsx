import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type TAnalyticsData = {
    month: number;
    year: number;
    totalEarnings?: number;
    totalRides?: number;
}

type TAnalyticsChartProps = {
    data: TAnalyticsData[];
    dataKey: string;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const AnalyticsChart = ({ data, dataKey }: TAnalyticsChartProps) => {
  const formattedData = data.map((item: TAnalyticsData) => ({
    ...item,
    name: monthNames[item.month - 1]
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={dataKey} fill="#8884d8" />
            </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;