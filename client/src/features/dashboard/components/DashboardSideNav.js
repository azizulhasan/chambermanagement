import React from 'react';
import { Link } from 'react-router-dom';
import { AdminDashboardIcons } from '../../../data/database';
import { getUserName } from '../../../utilities/utilities';

const {
    Dashboard: DashboardIcon,
    Mail: MailIcon,
    Services: ServicesIcon,
    Users: UsersIcon,
    Schedules: SchedulesIcon,
    BookOpen,
    Settings: SettingsIcon,
    ArrowDown,
} = AdminDashboardIcons;

export default function DashboardSideNav() {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading ">Core</div>
                        <Link className="nav-link" to="/dashboard">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                <DashboardIcon />
                            </div>
                            Dashboard
                        </Link>
                        <Link className="nav-link" to="/dashboard/mail">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                <MailIcon />
                            </div>
                            Mail
                        </Link>
                        <Link className="nav-link" to="/dashboard/services">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                <ServicesIcon />
                            </div>
                            Services
                        </Link>
                        <Link className="nav-link" to="/dashboard/users">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                <UsersIcon />
                            </div>
                            Users
                        </Link>
                        <Link className="nav-link" to="/dashboard/schedules">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                <SchedulesIcon />
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
                                <BookOpen />
                            </div>
                            Portfolio
                            <div
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                className="sb-sidenav-collapse-arrow"
                            >
                                <ArrowDown stroke="#fff" />
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
                                    <div
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            display: 'inline-flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        className="sb-sidenav-collapse-arrow"
                                    >
                                        <ArrowDown stroke="#fff" />
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
                                <SettingsIcon />
                            </div>
                            Settings
                        </Link>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    {/* {getUserName()} */}
                </div>
            </nav>
        </div>
    );
}
