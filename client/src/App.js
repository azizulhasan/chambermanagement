import React from "react";

/**
 * Stypes and scripts
 */
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.js";



/**
 * pages
 */
import Dashboard from "./pages/Dashboard";
import Front from "./pages/Front";

export default function App() {
  let pathArr = window.location.pathname

  if (!pathArr.includes('dashboard')) {
    return <Front />;
  } else {
    return <Dashboard />
  }
}
