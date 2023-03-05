import { Fragment, useEffect, useRef, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { database } from '../../../../database';
import { authenTicateUser, logout } from '../../../../utilities/utilities';
import { useSelector } from 'react-redux';

const { topMenus } = database;

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function MenuBar() {
    const [navbar, setNavbar] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [hiddenMenus, setHiddenMenus] = useState([]);

    const { loggedInUser } = useSelector((state) => state.users);

    useEffect(() => {
        if (loggedInUser.accessToken) {
            setIsUserLoggedIn(true);
            setUserRole(loggedInUser.userRole);
        }
    }, [loggedInUser.accessToken, loggedInUser]);

    useEffect(() => {
        if (isUserLoggedIn) {
            if (userRole === 'ADMIN') {
                setHiddenMenus(['/user-panel', '/login']);
            } else if (userRole === 'USER' || userRole === 'DOCTOR') {
                setHiddenMenus(['/dashboard', '/login']);
            }
        } else {
            setHiddenMenus(['/dashboard', '/user-panel']);
        }
    }, [isUserLoggedIn, userRole]);

    return (
        <nav className="w-full bg-white shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link
                        to="/"
                        className="flex flex-shrink-0 items-center  text-black font-medium"
                    >
                        <img
                            className="block h-10 w-auto lg:hidden"
                            src={
                                process.env.REACT_APP_URL +
                                '/assets/front/images/mindtoheart.ogo.png'
                            }
                            alt="Mind To Heart"
                        />
                        <img
                            className="hidden h-8 w-auto lg:block"
                            src={
                                process.env.REACT_APP_URL +
                                '/assets/front/images/mindtoheart.ogo.png'
                            }
                            alt="Mind To Heart"
                        />
                        Mind To Heart
                    </Link>
                    <div className="md:hidden">
                        <button
                            className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                            onClick={() => setNavbar(!navbar)}
                        >
                            {navbar ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-3 md:block md:pb-0 md:mt-0 ${
                            navbar ? 'block' : 'hidden'
                        }`}
                    >
                        <ul className="items-center justify-center space-y-3 md:flex md:space-x-6 md:space-y-0">
                            {topMenus?.map((item) => {
                                if (hiddenMenus.includes(item.href)) {
                                    return null;
                                }

                                return (
                                    <li key={item.name}>
                                        {!item.href.includes('#') ? (
                                            <Link
                                                to={item.href}
                                                aria-current={
                                                    item.current
                                                        ? 'page'
                                                        : undefined
                                                }
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-themeColor text-white'
                                                        : 'text-black hover:bg-themeColor hover:!text-white',
                                                    'px-3 py-2 text-sm font-medium cursor-pointer'
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <Link
                                                to={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-themeColor text-white'
                                                        : 'text-black hover:bg-themeColor hover:!text-white',
                                                    'px-3 py-2 text-sm font-medium cursor-pointer'
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                            {isUserLoggedIn && (
                                <li>
                                    <Link
                                        role="button"
                                        className=" text-black'
                                                     hover:text-white hover:bg-themeColor px-3 py-2 text-sm font-medium cursor-pointer"
                                        onClick={() => logout()}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
