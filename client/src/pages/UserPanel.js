import { Navigate, Route, Routes } from 'react-router-dom';
import UserPanelSkeleton from '../layouts/UserPanelSkeleton';
import Schedule from '../features/user-panel/pages/Schedule';
import Settings from '../features/user-panel/pages/Settings';
import '../styles/UserPanel.css';
import { addCSS, addScripts } from '../utilities/utilities';

function UserPanel() {
    addCSS(['/assets/front/css/tailwind.css']);
    // addScripts(js);
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="text-gray-900">
                        <UserPanelSkeleton />
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

export default UserPanel;
