import React, { Component } from 'react';

export default class LeftMenu extends Component {
    render() {
        return (
            <React.Fragment>
                {/* Mobile nav toggle button  */}
                {/* <button type="button" className="mobile-nav-toggle d-xl-none"><i className="bi bi-list mobile-nav-toggle"></i></button>  */}
                {/* <i className="bi bi-list mobile-nav-toggle d-none"></i> */}
                {/* Header */}
                <header
                    id="header"
                    className="d-flex flex-column justify-content-center"
                >
                    <nav id="navbar" className="navbar navmenu">
                        <ul>
                            <li>
                                <a
                                    href="#hero"
                                    className={'nav-link scrollto active'}
                                >
                                    <i className="bx bx-home"></i>{' '}
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="nav-link scrollto">
                                    <i className="bx bx-user"></i>{' '}
                                    <span>About</span>
                                </a>
                            </li>
                            <li>
                                <a href="#resume" className="nav-link scrollto">
                                    <i className="bx bx-file-blank"></i>{' '}
                                    <span>Resume</span>
                                </a>
                            </li>
                            {/* <li>
                <a href="#portfolio" className="nav-link scrollto">
                  <i className="bx bx-book-content"></i> <span>Portfolio</span>
                </a>
              </li> */}
                            {/* <li>
                <a href="#services" className="nav-link">
                  <i className="bx bx-server"></i> <span>Services</span>
                </a>
              </li> */}
                            <li>
                                <a href="#contact" className="nav-link">
                                    <i className="bx bx-envelope"></i>{' '}
                                    <span>Contact</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {/* .navmenu -->*/}
                </header>
            </React.Fragment>
        );
    }
}
