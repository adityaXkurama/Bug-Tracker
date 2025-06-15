// ✅ src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          
          <Route path="/login" element={<Login />} />

          <Route
            path="/developer"
            element={
              <ProtectedRoute role="developer">
                <DeveloperDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager"
            element={
              <ProtectedRoute role="manager">
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
