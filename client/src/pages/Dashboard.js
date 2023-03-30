import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useJwt } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
    addScripts,
    addCSS,
    getComponentName,
    authenTicateUser,
    getRgisteredUser,
    isAdmin,
    redirectUser,
    removeJsFromDOM,
    removeCSSFromDOM,
} from '../utilities/utilities';

/**
 * Admin Dashboard Pages
 */
import Dashboard from '../features/dashboard/pages/dasboard/Dashboard';
import Mail from '../features/dashboard/pages/mail/Mail';
import Services from '../features/dashboard/pages/services/Services';
import Users from '../features/dashboard/pages/users/Users';
import Schedules from '../features/dashboard/pages/schedules/Schedules';
import Settings from '../features/dashboard/pages/settings/Settings';
/**
 * Portfolio components
 */
// import Hero from "../components/dashboard/portfolio/hero/Hero";
// import About from "../components/dashboard/portfolio/about/About";
// import Skills from "../components/dashboard/portfolio/skills/Skills";
// import Summery from "../components/dashboard/portfolio/resume/summery/Summery";
// import Education from "../components/dashboard/portfolio/resume/education/Education";
// import Experience from "../components/dashboard/portfolio/resume/experience/Experience";
import Contact from '../features/dashboard/pages/portfolio/contact/Contact';

import { useSelector } from 'react-redux';
import DashboardSkeleton from '../layouts/DashboardSkeleton';

export default function AdminDashboard() {
    const [componentName, setComponentName] = useState(getComponentName());
    const { loggedInUser } = useSelector((state) => state.users);
    const accessToken = loggedInUser ? loggedInUser.accessToken : null;
    const navigate = useNavigate();

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
                                <Route path="users" element={<Users />} />
                                <Route
                                    path="schedules"
                                    element={<Schedules />}
                                />
                                <Route path="contact" element={<Contact />} />
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
