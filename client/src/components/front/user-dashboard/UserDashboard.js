import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/UserDashboardLayout";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import "./UserDashboard.css";

function UserDashboard() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="text-gray-900">
            <DashboardLayout />
          </div>
        }
      >
        <Route path="/" element={<Navigate to="schedule" replace={true} />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default UserDashboard;
