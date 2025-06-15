import { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";

import LogoutButton from "../components/LogoutButton";
import TaskForm from "../components/TaskForm";
import DeveloperTaskList from "../components/DeveloperTaskList";

const DeveloperDashboard = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const { user } = useAuthStore();
  const {
    tasks,
    updateTask,
    startTimer,
    stopTimer,
    isTimerRunning,
    deleteTask,
  } = useTaskStore();

  const { darkMode, toggleDarkMode } = useThemeStore();

  const myTasks = tasks.filter((t) => t.assignee === user.name);

  const filteredTasks = myTasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      const order = { low: 1, medium: 2, high: 3 };
      return order[b.priority] - order[a.priority];
    }
    return new Date(b[sortBy]) - new Date(a[sortBy]);
  });

  return (
    <div className="p-4 sm:p-6 mx-auto bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-center sm:text-left">Developer Dashboard</h2>
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

      <TaskForm />

      <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <DeveloperTaskList
        tasks={sortedTasks}
        isTimerRunning={isTimerRunning}
        startTimer={startTimer}
        stopTimer={stopTimer}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default DeveloperDashboard;
