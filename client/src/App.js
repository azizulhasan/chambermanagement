import React, { lazy, Suspense, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/front/common/Loader';

/**
 * pages
 */
import Dashboard from './pages/Dashboard';
import {
    addCSS,
    addScripts,
    authenTicateUser,
    getRgisteredUser,
} from './utilities/utilities';

import { useSelector } from 'react-redux';
import AdminPrivateOutlet from './features/authentication/components/AdminPrivateOutlet';
import UserPrivateOutlet from './features/authentication/components/UserPrivateOutlet';
import { database } from './database';
import RefundPolicy from './features/front/pages/policy/RefundPolicy';
import PrivacyPolicy from './features/front/pages/policy/PrivacyPolicy';
import TermsOfServices from './features/front/pages/policy/TermsOfServices';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./components/notfound/NotFound'));
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const MemberDetails = lazy(() => import('./pages/MemberDetails'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Appoinment = lazy(() => import('./pages/Appoinment'));
const UserPanel = lazy(() => import('./pages/UserPanel'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentFail = lazy(() => import('./pages/PaymentFail'));
const PaymentCancel = lazy(() => import('./pages/PaymentCancel'));

const {
    basic: { backgroundColor },
} = database;

export default function App() {
    const location = useLocation();
    useLayoutEffect(() => {
        if (location.pathname !== '/') {
            document.documentElement.scrollTo({
                top: 0,
                bottom: 0,
                behavior: 'instant',
            });
        }
    }, [location.pathname]);

    document.getElementsByTagName('body')[0].style.backgroundColor =
        backgroundColor;

    return (
        <>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/appointment" element={<Appoinment />} />
                    <Route path="/appointment/*">
                        <Route
                            path="payment-success"
                            element={<PaymentSuccess />}
                        />
                        <Route path="payment-fail" element={<PaymentFail />} />
                        <Route
                            path="payment-cancel"
                            element={<PaymentCancel />}
                        />
                    </Route>
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
                    <Route path="user-panel/*" element={<UserPanel />} />
                    {/* </Route> */}
                    <Route path="*" element={<NotFound />} />;
                </Routes>
            </Suspense>
        </>
    );
}
