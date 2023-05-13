import React, { useEffect, useState } from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useJwt } from 'react-jwt';
import 'react-toastify/dist/ReactToastify.css';
import {
    addScripts,
    addCSS,
    getComponentName,
} from '../utilities/utilities';

/**
 * Admin Dashboard Pages
 */
import Dashboard from '../features/dashboard/dasboard/Dashboard';
import Mail from '../features/dashboard/mail/Mail';
import Services from '../features/dashboard/services/Services';
import Branches from '../features/dashboard/branches/Branches';
import Users from '../features/dashboard/users/Users';
import Schedules from '../features/dashboard/schedules/Schedules';
import Settings from '../features/dashboard/settings/Settings';


import { useSelector } from 'react-redux';
import DashboardSkeleton from '../layouts/dashboard/DashboardSkeleton';

export default function AdminDashboard() {
    const [componentName, setComponentName] = useState(getComponentName());
    const { loggedInUser } = useSelector((state) => state.users);
    const accessToken = loggedInUser ? loggedInUser.accessToken : null;

    const { decodedToken, isExpired, reEvaluateToken } = useJwt(accessToken);

    const updateToken = () => {
        reEvaluateToken(accessToken); // decodedToken and isExpired will be updated
    };

    useEffect(() => {
        new MutationObserver(() => {
            setComponentName(getComponentName());
        }).observe(document, { subtree: true, childList: true });
    }, [componentName]);

    addCSS([
        '/assets/dashboard/css/styles.css',
        '/assets/dashboard/css/custom.css',
    ]);
    addScripts([
        '/assets/dashboard/vendor/bootstrap/js/bootstrap.bundle.min.js',
        '/assets/dashboard/js/scripts.js',
    ]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <DashboardSkeleton>
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Dashboard</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">
                                    Dashboard {componentName}
                                </li>
                            </ol>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="mail" element={<Mail />} />
                                <Route path="services" element={<Services />} />
                                <Route path="branches" element={<Branches />} />
                                <Route path="users" element={<Users />} />
                                <Route
                                    path="schedules"
                                    element={<Schedules />}
                                />
                                <Route path="settings" element={<Settings />} />
                            </Routes>
                        </div>
                    </main>
                    <footer className="py-4 mt-auto footer_bg">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">
                                    Copyright &copy;{' '}
                                    <a
                                        href="http://azizulhasan.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Azizul Hasan
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </DashboardSkeleton>
        </>
    );
}
