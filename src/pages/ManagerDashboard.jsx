import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useTaskStore } from "../store/taskStore";
import { useThemeStore } from "../store/themeStore";

import LogoutButton from "../components/LogoutButton";
import TaskTrendChart from "../components/TaskTrendChart";
import ManagerTaskList from "../components/ManagerTaskList";

const ManagerDashboard = () => {
  const { user } = useAuthStore();
  const {
    tasks,
    updateTask,
    deleteTask,
    isTimerRunning,
  } = useTaskStore();

  const { darkMode, toggleDarkMode } = useThemeStore();

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const filteredTasks = tasks
    .filter((task) => (filter === "all" ? true : task.status === filter))
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order = { low: 1, medium: 2, high: 3 };
        return order[b.priority] - order[a.priority];
      }
      return new Date(b[sortBy]) - new Date(a[sortBy]);
    });

  return (
    <div className="p-4 sm:p-6 mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-center sm:text-left">
          Manager Dashboard
        </h2>
        <div className="flex gap-2 items-center">
          <button
            onClick={toggleDarkMode}
            className="mb-5 p-4 h-12 rounded border text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <LogoutButton />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <ManagerTaskList
        tasks={filteredTasks}
        isTimerRunning={isTimerRunning}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />

      <div className="mt-10">
        <TaskTrendChart />
      </div>
    </div>
  );
};

export default ManagerDashboard;
