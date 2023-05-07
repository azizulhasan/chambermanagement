import React from 'react';
import { Link } from 'react-router-dom';
import { AdminDashboardIcons } from '../../data/database';
// import { getUserName } from '../../utilities/utilities';

const {
    Dashboard: DashboardIcon,
    Mail: MailIcon,
    Services: ServicesIcon,
    Users: UsersIcon,
    Schedules: SchedulesIcon,
    Settings: SettingsIcon,
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
                        <Link className="nav-link" to="/dashboard/branches">
                            <div style={{ width: '20px', marginRight: '8px' }}>
                                <ServicesIcon />
                            </div>
                            Branches
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
                        <div className="sb-sidenav-menu-heading">Settings</div>
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
