import React, { useEffect } from "react";


import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import "./assets/css/style.css";
import './sections/carousel.scss'

/**
 * Utilities
 */
import { addScripts } from "../../../utilities/utilities";
/**
 * Sections
 */
import MenuBar from "./sections/MenuBar";
import Slider from "./sections/Slider";
import Professionals from "./sections/Professionals";
import GoogleMap from "./sections/GoogleMap";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Resume from "./sections/resume/Resume";
import Contact from "./sections/Contact";
import Footer from "../partials/Footer";
import WhatsAppIcon from "./sections/WhatsAppIcon";


export default function Home() {
  useEffect(() => {
    /**
     * Load all script of portfolio. and this url is based on "public/front/assets" folder
     * @param {url} script url
     */
    addScripts([
      "assets/front/vendor/purecounter/purecounter.js",
      "assets/front/vendor/aos/aos.js",
      "assets/front/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "assets/front/vendor/swiper/swiper-bundle.min.js",
      "assets/front/vendor/typed.js/typed.min.js",
      "assets/front/vendor/waypoints/noframework.waypoints.js",
      "assets/front/js/main.js",
    ]);
  });

  return (
    <React.Fragment>
      {/* Header Section*/}
      <MenuBar />
      {/* End Header */}
      {/** Slider Section */}
      <Slider />
      {/** End Slider */}
      <Professionals />
      <GoogleMap />
      <main id="main">
        {/** About Section */}
        <About />
        {/** End About Section */}
        {/** Skills Section */}
        <Skills />
        {/** End Skills Section */}
        {/** Resume Section */}
        <Resume />
        {/** End Resume Section */}
        {/** Contact Section */}
        <Contact />
        {/** End Contact Section */}
      </main>
      {/* End #main */}
      <WhatsAppIcon />
      {/** Footer */}
      <Footer />
      {/* End Footer */}
      {/* <ScrollToTop /> */}
    </React.Fragment>
  );
}
