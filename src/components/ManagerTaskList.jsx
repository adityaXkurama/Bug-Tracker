const ManagerTaskList = ({ tasks, isTimerRunning, updateTask, deleteTask }) => {
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

  if (!tasks.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        No tasks available.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => {
        const running = isTimerRunning(task.id);
        const totalTime = calculateTotalTime(task.timeLogs);

        return (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow rounded flex flex-col justify-between border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-1">
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
              <div className="text-sm space-y-0.5 mt-2">
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Assignee:</strong> {task.assignee}</p>
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

            <div className="flex flex-wrap gap-2 mt-4">
              {task.status === "pending" && (
                <>
                  <button
                    onClick={() => updateTask(task.id, { status: "closed✅" })}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Approve Close
                  </button>
                  <button
                    onClick={() => updateTask(task.id, { status: "open" })}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Reopen
                  </button>
                </>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ManagerTaskList;
