import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Loader from './components/front/common/Loader';
import RefundPolicy from './components/front/common/policy/RefundPolicy';
import PrivacyPolicy from './components/front/common/policy/PrivacyPolicy';
import TermsOfServices from './components/front/common/policy/TermsOfServices';

/**
 * pages
 */
import Dashboard from './pages/Dashboard';
import Front from './pages/Front';
import {
    addCSS,
    addScripts,
    authenTicateUser,
    getRgisteredUser,
} from './utilities/utilities';

import { useSelector } from 'react-redux';
import AdminPrivateOutlet from './components/front/common/AdminPrivateOutlet';
import UserPrivateOutlet from './components/front/common/UserPrivateOutlet';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() =>
    import('./components/front/common/notfound/NotFound')
);
const Home = lazy(() => import('./components/front/home/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const MemberDetails = lazy(() => import('./pages/MemberDetails'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Appoinment = lazy(() => import('./pages/Appoinment'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

export default function App() {
    addCSS(['/assets/front/css/tailwind.css']);

    const { loggedInUser } = useSelector((state) => state.users);
    useEffect(() => {
        console.log('user', loggedInUser);
    }, []);

    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/appointment" element={<Appoinment />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/forgotpassword"
                        element={<ForgotPassword />}
                    />
                    <Route path="/refund-policy" element={<RefundPolicy />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route
                        path="/health-professionals/:slug"
                        element={<MemberDetails />}
                    />
                    <Route
                        path="/service-details/:slug"
                        element={<ServiceDetails />}
                    />
                    <Route
                        path="/terms-of-services"
                        element={<TermsOfServices />}
                    />
                    <Route path="/" element={<AdminPrivateOutlet />}>
                        <Route path="dashboard/*" element={<Dashboard />} />
                    </Route>
                    <Route path="/" element={<UserPrivateOutlet />}>
                        <Route
                            path="user-panel/*"
                            element={<UserDashboard />}
                        />
                    </Route>
                    <Route path="*" element={<NotFound />} />;
                </Routes>
            </Suspense>
        </Router>
    );
}
