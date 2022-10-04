import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import { Navbar, Container, Nav, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "../components/front/notfound/NotFound";
import Home from "../components/front/home/Home";

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
  });
  return (
    <Router>
      <Navbar
        style={{ zIndex: "99999" }}
        className="mobileMenu"
        sticky="top"
        bg="light"
        expand="lg"
      >
        <Container>
          <Link className="navbar-brand" to="/">
            {process.env.REACT_APP_WEBSITE_NAME}
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <a href="#hero" className="nav-link active">
                <span>Home</span>
              </a>

              <a href="#about" className="nav-link ">
                <span>About</span>
              </a>
              <a href="#skills" className="nav-link">
                <span>Skills</span>
              </a>
              <a href="#resume" className="nav-link">
                <span>Resume</span>
              </a>
              <a href="#contact" className="nav-link">
                <span>Contact</span>
              </a>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />} />;
          </Routes>
        </Row>
      </Container>
    </Router>
  );
}

export default Front;
