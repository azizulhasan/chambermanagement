import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Loader from "../components/front/common/Loader";
import RefundPolicy from "../components/front/common/policy/RefundPolicy";
import PrivacyPolicy from "../components/front/common/policy/PrivacyPolicy";
import TermsOfServices from "../components/front/common/policy/TermsOfServices";
import { addCSS } from "../utilities/utilities";
import WhatsAppIcon from "../components/front/common/WhatsAppIcon";
import ServiceDetails from "./ServiceDetails";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const NotFound = lazy(() =>
  import("../components/front/common/notfound/NotFound")
);
const Home = lazy(() => import("../components/front/home/Home"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const Appoinment = lazy(() => import("./Appoinment"));
const MemberDetails = lazy(() => import("./MemberDetails"));

function Front() {
  addCSS(["/assets/front/css/tailwind.css"]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    /**
     * Display or hide portfolio menus.
     */
    const displayMunu = () => {
      let menus = document.getElementsByClassName("mobileMenu");
      if (window.innerWidth > 991) {
        [...menus].forEach((menu) => {
          menu.style.display = "none";
        });
      } else {
        [...menus].forEach((menu) => {
          menu.style.display = "block";
        });
      }
    };
    displayMunu();
    /**
     * Display some menus on mobile
     */
    window.addEventListener("resize", () => {
      if (window.innerWidth > 991) {
        displayMunu();
      } else if (window.innerWidth < 991 && window.innerWidth > 989) {
        window.location.reload(true);
        displayMunu();
      }
    });
  }, []);
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/health-professionals/:slug"
              element={<MemberDetails />}
            />
            <Route path="/service-details/:slug" element={<ServiceDetails />} />
            <Route path="/appointment" element={<Appoinment />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route path="/refund-policy" element={<RefundPolicy />}></Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route
              path="/terms-of-services"
              element={<TermsOfServices />}
            ></Route>
            <Route path="*" element={<NotFound />} />;
          </Routes>
        </Suspense>
      </Router>
      <WhatsAppIcon />
    </>
  );
}

export default Front;
