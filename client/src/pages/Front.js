import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Loader from '../components/front/common/Loader';
import RefundPolicy from '../components/front/common/policy/RefundPolicy';
import PrivacyPolicy from '../components/front/common/policy/PrivacyPolicy';
import TermsOfServices from '../components/front/common/policy/TermsOfServices';
import {
    addCSS,
    authenTicateUser,
    getRgisteredUser,
} from '../utilities/utilities';
import PrivateOutlet from '../components/front/common/PrivateOutlet';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const NotFound = lazy(() =>
    import('../components/front/common/notfound/NotFound')
);
const Home = lazy(() => import('../components/front/home/Home'));
const AboutUs = lazy(() => import('./AboutUs'));
const MemberDetails = lazy(() => import('./MemberDetails'));
const ServiceDetails = lazy(() => import('./ServiceDetails'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const Appoinment = lazy(() => import('./Appoinment'));
const UserDashboard = lazy(() =>
    import('../components/front/user-dashboard/UserDashboard')
);

function Front() {
    addCSS(['/assets/front/css/tailwind.css']);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        /**
         * Display or hide portfolio menus.
         */
        const displayMunu = () => {
            let menus = document.getElementsByClassName('mobileMenu');
            if (window.innerWidth > 991) {
                [...menus].forEach((menu) => {
                    menu.style.display = 'none';
                });
            } else {
                [...menus].forEach((menu) => {
                    menu.style.display = 'block';
                });
            }
        };
        displayMunu();
        /**
         * Display some menus on mobile
         */
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991) {
                displayMunu();
            } else if (window.innerWidth < 991 && window.innerWidth > 989) {
                window.location.reload(true);
                displayMunu();
            }
        });
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
                    <Route path="/*" element={<PrivateOutlet />}>
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

export default Front;
