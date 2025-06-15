import { useTaskStore } from "../store/taskStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";

const TaskTrendChart = () => {
  const { tasks } = useTaskStore();

  const trendData = tasks.reduce((acc, task) => {
    const date = format(new Date(task.createdAt), "yyyy-MM-dd");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(trendData)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white shadow-md p-4 rounded w-full h-80 ">
      <h2 className="text-xl font-semibold mb-4">Task Creation Trend</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(date) => format(parseISO(date), "MMM d")} />
            <YAxis allowDecimals={false} />
            <Tooltip labelFormatter={(label) => format(parseISO(label), "MMMM d, yyyy")} />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No data to show.</p>
      )}
    </div>
  );
};

export default TaskTrendChart;
