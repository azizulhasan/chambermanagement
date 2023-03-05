import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../components/front/user-dashboard/layouts/UserDashboardLayout';
import Schedule from '../components/front/user-dashboard/pages/Schedule';
import Settings from '../components/front/user-dashboard/pages/Settings';
import '../components/front/user-dashboard/UserDashboard.css';

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
                <Route
                    path="/"
                    element={<Navigate to="schedule" replace={true} />}
                />
                <Route path="schedule" element={<Schedule />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}

export default UserDashboard;
