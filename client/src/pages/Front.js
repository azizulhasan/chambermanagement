import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import("./tailwind.css")

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const NotFound = lazy(() => import("../components/front/notfound/NotFound"));
const Home = lazy(() => import("../components/front/home/Home"));

function Front() {
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
    <Router>
      <Suspense fallback={<div>Loading.......</div>}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />} />;
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Front;
