import { useAuthStore } from "../store/authStore";

const DeveloperTaskList = ({
  tasks,
  isTimerRunning,
  startTimer,
  stopTimer,
  updateTask,
  logTime,
}) => {
  const { user } = useAuthStore();

  const formatDuration = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const calculateTotalTime = (logs = []) => {
    return logs.reduce((acc, log) => acc + (log.duration || 0), 0);
  };

  const handleRequestClose = (id) => {
    updateTask(id, { status: "pending" });
  };

  const handleToggleTimer = (id) => {
    isTimerRunning(id) ? stopTimer(id) : startTimer(id);
  };

  const assignedTasks = tasks.filter((task) => task.assignee === user?.name);

  if (!assignedTasks.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        No tasks assigned to you.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {assignedTasks.map((task) => {
        const running = isTimerRunning(task.id);
        const totalTime = calculateTotalTime(task.timeLogs);

        return (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 p-4 shadow rounded flex flex-col justify-between border border-gray-200 dark:border-gray-600 transition-colors duration-300"
          >
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{task.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
              <div className="text-sm space-y-0.5 mt-2 text-gray-700 dark:text-gray-300">
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Due Date:</strong> {task.dueDate || "Not set"}</p>
                <p>
                  <strong>Time Spent:</strong> {formatDuration(totalTime)}
                </p>
                <p>
                  <strong>Timer:</strong>{" "}
                  <span className={running ? "text-green-500" : "text-gray-500 dark:text-gray-400"}>
                    {running ? "Running" : "Stopped"}
                  </span>
                </p>
              </div>
            </div>

            {task.status === "open" && (
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => handleToggleTimer(task.id)}
                  className={`${
                    running ? "bg-red-600" : "bg-green-600"
                  } text-white px-3 py-1 rounded text-sm hover:opacity-90`}
                >
                  {running ? "Stop Timer" : "Start Timer"}
                </button>

                <button
                  onClick={() => handleRequestClose(task.id)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                >
                  Request Close
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DeveloperTaskList;
