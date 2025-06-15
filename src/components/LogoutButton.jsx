import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center mb-4 p-4 gap-4  shadow rounded bg-white dark:bg-gray-900  text-gray-900 dark:text-white transition-colors duration-300">
      <div>
        <p className="text-sm text-gray-700 dark:text-white">Welcome, <strong>{user.name}</strong> ({user.role})</p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
