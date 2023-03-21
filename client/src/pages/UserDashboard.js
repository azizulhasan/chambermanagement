import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../components/user-dashboard/layouts/UserDashboardLayout';
import Schedule from '../components/user-dashboard/pages/Schedule';
import Settings from '../components/user-dashboard/pages/Settings';
import '../components/user-dashboard/UserDashboard.css';
import { addCSS, addScripts } from '../utilities/utilities';

function UserDashboard() {
    addCSS(['/assets/front/css/tailwind.css']);
    // addScripts(js);
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
