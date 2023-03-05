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
 * Dashboard Components
 */
import DashboardContent from '../components/dashboard/dasboardcontent/DashboardContent';
import DashboardTopNav from '../components/dashboard/dasboardcontent/DashboardTopNav';
import DashboardSideNav from '../components/dashboard/dasboardcontent/DashboardSideNav';
import Mail from '../components/dashboard/mail/Mail';
// Service
import Services from '../components/dashboard/services/Services';
// Users
import Users from '../components/dashboard/users/Users';
// Schedules
import Schedules from '../components/dashboard/schedules/Schedules';
/**
 * Portfolio components
 */
// import Hero from "../components/dashboard/portfolio/hero/Hero";
// import About from "../components/dashboard/portfolio/about/About";
// import Skills from "../components/dashboard/portfolio/skills/Skills";
// import Summery from "../components/dashboard/portfolio/resume/summery/Summery";
// import Education from "../components/dashboard/portfolio/resume/education/Education";
// import Experience from "../components/dashboard/portfolio/resume/experience/Experience";
import Contact from '../components/dashboard/portfolio/contact/Contact';
import Settings from '../components/dashboard/settings/Settings';

import { useSelector } from 'react-redux';

export default function Dashboard() {
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



    useEffect(() => {
        addCSS([
            '/assets/dashboard/css/styles.css',
            '/assets/dashboard/css/custom.css',
        ]);
        addScripts([
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js',
            '/assets/dashboard/vendor/bootstrap/js/bootstrap.bundle.min.js',
            '/assets/dashboard/js/scripts.js',
        ]);
    }, [])

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
            <DashboardTopNav />
            <div id="layoutSidenav">
                <DashboardSideNav />
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
                                <Route
                                    path="/"
                                    element={<DashboardContent />}
                                />
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
            </div>
        </>
    );
}
