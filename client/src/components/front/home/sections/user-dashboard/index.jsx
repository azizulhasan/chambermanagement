import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard-layout";
import Schedule from "./pages/schedule";
import Settings from "./pages/settings";
import "./index.css";

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
