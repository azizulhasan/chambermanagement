import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useJwt } from "react-jwt";

import "react-toastify/dist/ReactToastify.css";
/**
 * Scripts
 */
import "./assets/css/styles.css";
import "./assets/css/custom.css";
import "./assets/js/scripts.js";
import {
  addScripts,
  getComponentName,
  authenTicateUser,
  getRgisteredUser
} from "../context/utilities";

/**
 * Dashboard Components
 */
import DashboardContent from "./dasboardcontent/DashboardContent";
import DashboardTopNav from "./dasboardcontent/DashboardTopNav";
import DashboardSideNav from "./dasboardcontent/DashboardSideNav";
import Mail from "./mail/Mail";
// Service
import Services from './services/Services'
// Team
import Team from './team/Team'
/**
 * Portfolio components
 */
import Hero from "./portfolio/hero/Hero";
import About from "./portfolio/about/About";
import Skills from "./portfolio/skills/Skills";
import Summery from "./portfolio/resume/summery/Summery";
import Education from "./portfolio/resume/education/Education";
import Experience from "./portfolio/resume/experience/Experience";

import Contact from "./portfolio/contact/Contact";
import Settings from "./settings/Settings";



export default function Dashboard() {
  const [componentName, setComponentName] = useState(getComponentName());
  let  tokenObj = getRgisteredUser();
  const accessToken = tokenObj.session.accessToken || tokenObj.storage.accessToken;
   const { decodedToken, isExpired, reEvaluateToken } = useJwt(accessToken);
   console.log(isExpired)
  const updateToken = () => {
    reEvaluateToken(accessToken); // decodedToken and isExpired will be updated
  }

  useEffect(() => {
      
    new MutationObserver(() => {
      setComponentName(getComponentName());
    }).observe(document, { subtree: true, childList: true });
  }, [componentName]);

  addScripts([
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js",
  ]);

  if(!authenTicateUser()){
      window.location.href = '/login'

  //   const Auth = {
  //   session: getSessionStorage(),
  //   storage: getLocalStorage(),
  // };

  // const token = Auth.session.token || Auth.storage.token;
  // console.log(token);
		// if (token) {
		// 	const user = jwt.decode(token)
    //   console.log(user)
		// 	if (!user) {
		// 		return false;
		// 	} else {
		// 		return true;
		// 	}
		// }
    // return false;

      //       fallback: {
      //   util: require.resolve("util/"),
      //   stream: require.resolve("stream-browserify/"),
      //   crypto: require.resolve("crypto-browserify/")
      // },
  }else{

  return (

    <Router>
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
                <Route path="/dashboard" element={<DashboardContent />} />
                <Route path="/dashboard/mail" element={<Mail />} />
                <Route path="/dashboard/services" element={<Services />} />
                <Route path="/dashboard/team" element={<Team />} />
                <Route path="/dashboard/hero" element={<Hero />} />
                <Route path="/dashboard/about" element={<About />} />
                <Route path="/dashboard/skills" element={<Skills />} />
                <Route path="/dashboard/resume/summery" element={<Summery />} />
                <Route
                  path="/dashboard/resume/education"
                  element={<Education />}
                />
                <Route
                  path="/dashboard/resume/experience"
                  element={<Experience />}
                />
                <Route path="/dashboard/contact" element={<Contact />} />
                <Route path="/dashboard/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
          <footer className="py-4 mt-auto footer_bg">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy;{" "}
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
    </Router>
  );
  }

}
