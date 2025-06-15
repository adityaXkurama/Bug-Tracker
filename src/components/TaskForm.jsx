import { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import { useAuthStore } from "../store/authStore";

export default function TaskForm() {
  const { createTask } = useTaskStore();
  const { user } = useAuthStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignee: user?.name || "",
    status: "open",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return alert("Title is required");

    createTask(form);
    setForm({
      title: "",
      description: "",
      priority: "medium",
      assignee: user?.username || "",
      status: "open",
      dueDate: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-4 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Assignee</label>
        <input
          type="text"
          name="assignee"
          value={form.assignee}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Assignee username"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Create Task
      </button>
    </form>
  );
}
