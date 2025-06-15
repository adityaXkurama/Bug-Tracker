import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const mockUsers = [
  { email: "dev1@example.com", password: "dev123", name: "Dev1", role: "developer" },
  { email: "dev2@example.com", password: "dev234", name: "Dev2", role: "developer" },
  { email: "manager@example.com", password: "admin123", name: "Manager", role: "manager" },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = mockUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      login(user);
      navigate(user.role === "manager" ? "/manager" : "/developer");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700 px-4 sm:px-6 bg-gradient-to-br from-slate-200 to-slate-500">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 text-black p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md bg-gradient-to-tl from-slate-200 to-slate-400"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-slate-800">Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-blue-600 hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform"
        >
          Login
        </button>

        <div className="text-sm text-gray-600 mt-6 text-center">
          <p className="mb-1">Try these credentials:</p>
          <p>
            <span className="font-medium">Developer:</span> dev1@example.com / <code>dev123</code>
          </p>
          <p>
            <span className="font-medium">Manager:</span> manager@example.com / <code>admin123</code>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
