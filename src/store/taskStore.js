import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const useTaskStore = create((set) => ({
  tasks: [],
  activeTimers: {}, 

  createTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: uuidv4(),
          status: "open",
          createdAt: new Date().toISOString(),
          timeLogs: [],
        },
      ],
    })),

  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),

  startTimer: (taskId) =>
    set((state) => ({
      activeTimers: {
        ...state.activeTimers,
        [taskId]: { startTime: Date.now() },
      },
    })),

  stopTimer: (taskId) =>
    set((state) => {
      const timer = state.activeTimers[taskId];
      if (!timer) return {};

      const duration = Date.now() - timer.startTime;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            timeLogs: [
              ...task.timeLogs,
              { startedAt: new Date(timer.startTime).toISOString(), duration },
            ],
          };
        }
        return task;
      });

      const { [taskId]: _, ...remainingTimers } = state.activeTimers;

      return {
        tasks: updatedTasks,
        activeTimers: remainingTimers,
      };
    }),

  isTimerRunning: (taskId) => {
    const timer = useTaskStore.getState().activeTimers[taskId];
    return !!timer;
  },
}));
