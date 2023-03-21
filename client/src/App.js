import React, { lazy, Suspense, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/front/common/Loader';
import RefundPolicy from './components/front/common/policy/RefundPolicy';
import PrivacyPolicy from './components/front/common/policy/PrivacyPolicy';
import TermsOfServices from './components/front/common/policy/TermsOfServices';

/**
 * pages
 */
import Dashboard from './pages/Dashboard';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() =>
    import('./components/front/common/notfound/NotFound')
);
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const MemberDetails = lazy(() => import('./pages/MemberDetails'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Appoinment = lazy(() => import('./pages/Appoinment'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

export default function App() {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            bottom: 0,
            behavior: 'instant',
        });
    }, [location.pathname]);

    return (
        <>
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
                    {/*//TODO: This route path must applied after session and locale storage issue fixed. */}
                    {/* <Route path="/" element={<AdminPrivateOutlet />}> */}
                    <Route path="dashboard/*" element={<Dashboard />} />
                    {/* </Route> */}
                    {/* <Route path="/" element={<UserPrivateOutlet />}> */}
                    <Route path="user-panel/*" element={<UserDashboard />} />
                    {/* </Route> */}
                    <Route path="*" element={<NotFound />} />;
                </Routes>
            </Suspense>
        </>
    );
}
