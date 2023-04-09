import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../store/usersSlice';
import { useDispatch } from 'react-redux';
// import { Menu, User } from '../../../assets/svg-components';
import { AdminDashboardIcons } from '../../data/database';
import { Search } from '../../assets/atlasIcons/AtlasIconsSolid';

const { Menu, User } = AdminDashboardIcons;

export default function DashboardTopNav() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogout = (e) => {
        e.preventDefault();
        alert('Are you sure?');
        dispatch(logOut());
        navigate('/');
    };
    return (
        <nav className="sb-topnav navbar navbar-expand topnav_bg">
            {/* <!-- Navbar Brand--> */}
            <Link className="navbar-brand ps-3" to="/">
                {process.env.REACT_APP_WEBSITE_NAME}
            </Link>
            {/* <!-- Sidebar Toggle--> */}
            <button
                style={{
                    width: '40px',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
                id="sidebarToggle"
                href="#!"
            >
                <Menu className="w-6 h-6" />
            </button>
            {/* <!-- Navbar Search--> */}
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group ">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search for..."
                        aria-label="Search for..."
                        aria-describedby="btnNavbarSearch"
                    />
                    <button
                        style={{
                            width: '45px',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        className="btn btn-dark"
                        id="btnNavbarSearch"
                        type="button"
                    >
                        <Search />
                    </button>
                </div>
            </form>
            {/* <!-- Navbar--> */}
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a
                        style={{
                            width: '50px',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <User />
                    </a>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdown"
                    >
                        <li>
                            <a className="dropdown-item" href="#!">
                                Settings
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#!">
                                Activity Log
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a
                                className="dropdown-item"
                                onClick={(e) => userLogout(e)}
                                href="#!"
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}
