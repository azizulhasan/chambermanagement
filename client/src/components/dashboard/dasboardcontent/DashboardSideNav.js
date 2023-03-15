import React from 'react';
import { Link } from 'react-router-dom';
import {
    Dashboard,
    Mail,
    OpenBook,
    Schedules,
    Services,
    Settings,
    Users,
} from '../../../assets/svg-components';
import { getUserName } from '../../../utilities/utilities';

export default function DashboardSideNav() {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading ">Core</div>
                        <Link className="nav-link" to="/dashboard">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                {Dashboard}
                            </div>
                            Dashboard
                        </Link>
                        <Link className="nav-link" to="/dashboard/mail">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                {Mail}
                            </div>
                            Mail
                        </Link>
                        <Link className="nav-link" to="/dashboard/services">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                {Services}
                            </div>
                            Services
                        </Link>
                        <Link className="nav-link" to="/dashboard/users">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                {Users}
                            </div>
                            Users
                        </Link>
                        <Link className="nav-link" to="/dashboard/schedules">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                {Schedules}
                            </div>
                            Schedules
                        </Link>
                        <div className="sb-sidenav-menu-heading">Interface</div>

                        <a
                            className="nav-link collapsed"
                            href="#"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsePages"
                            aria-expanded="false"
                            aria-controls="collapsePages"
                        >
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                {OpenBook}
                            </div>
                            Portfolio
                            <div className="sb-sidenav-collapse-arrow">
                                <i className="fas fa-angle-down"></i>
                            </div>
                        </a>
                        <div
                            className="collapse"
                            id="collapsePages"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#sidenavAccordion"
                        >
                            <nav
                                className="sb-sidenav-menu-nested nav accordion"
                                id="sidenavAccordionPages"
                            >
                                <Link className="nav-link" to="/dashboard/hero">
                                    Hero
                                </Link>
                                <Link
                                    className="nav-link"
                                    to="/dashboard/about"
                                >
                                    About
                                </Link>
                                <Link
                                    className="nav-link"
                                    to="/dashboard/skills"
                                >
                                    Skills
                                </Link>
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#pagesCollapseAuth"
                                    aria-expanded="false"
                                    aria-controls="pagesCollapseAuth"
                                >
                                    Resume
                                    <div className="sb-sidenav-collapse-arrow">
                                        <i className="fas fa-angle-down"></i>
                                    </div>
                                </a>
                                <div
                                    className="collapse"
                                    id="pagesCollapseAuth"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordionPages"
                                >
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link
                                            className="nav-link"
                                            to="/dashboard/resume/summery"
                                        >
                                            Summery
                                        </Link>
                                        <Link
                                            className="nav-link"
                                            to="/dashboard/resume/education"
                                        >
                                            Education
                                        </Link>
                                        <Link
                                            className="nav-link"
                                            to="/dashboard/resume/experience"
                                        >
                                            Experience
                                        </Link>
                                    </nav>
                                </div>
                                <Link
                                    className="nav-link"
                                    to="/dashboard/contact"
                                >
                                    Contact
                                </Link>
                            </nav>
                        </div>

                        {/* BLOG MENU */}
                        {/* 
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#blogLaout"
              aria-expanded="false"
              aria-controls="blogLaout"
            >
              <div className="sb-nav-link-icon">
              <i className="fas fa-blog"></i>
              </div>
              Blogs
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="blogLaout"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/dashboard/blogs">
                  Blogs
                </Link>
                <Link className="nav-link" to="/dashboard/category">
                  Category
                </Link>
              </nav>
            </div> */}
                        {/* Settings menu */}
                        <Link className="nav-link" to="/dashboard/settings">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                {Settings}
                            </div>
                            Settings
                        </Link>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    {getUserName()}
                </div>
            </nav>
        </div>
    );
}
