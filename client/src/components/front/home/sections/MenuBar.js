import { useEffect, useState, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { database } from '../../../../database';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../../store/usersSlice';

const { topMenus } = database;

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function MenuBar() {
    const [navbar, setNavbar] = useState(false);
    const [hiddenMenus, setHiddenMenus] = useState([]);
    const [rendered, setRendered] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { loggedInUser } = useSelector((state) => state.users);

    const userLogout = (e) => {
        e.preventDefault();
        alert('Are you sure?');
        dispatch(logOut());
        navigate('/');
    };

    useEffect(() => {
        if (!rendered) {
            setRendered(true);
        }
        if (loggedInUser.accessToken) {
            if (loggedInUser.userRole === 'ADMIN') {
                setHiddenMenus(['/user-panel', '/login']);
            } else if (
                loggedInUser.userRole === 'USER' ||
                loggedInUser.userRole === 'DOCTOR'
            ) {
                setHiddenMenus(['/dashboard', '/login']);
            }
        } else {
            setHiddenMenus(['/dashboard', '/user-panel']);
        }
    }, [loggedInUser.accessToken, loggedInUser, rendered]);

    if (!rendered) {
        return <></>;
    }

    return (
        <nav className="w-full bg-white shadow ">
            <div className="flex justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div className="min-h-[70px] flex items-center justify-between py-3 md:py-5 md:block">
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
                                    <Fragment key={item.name}>
                                        {!item.href.includes('#') &&
                                            !item.href.includes('/login') && (
                                                <li>
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
                                                </li>
                                            )}
                                        {item.href[0] === '#' &&
                                            pathname === '/' && (
                                                <li>
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-themeColor text-white'
                                                                : 'text-black hover:bg-themeColor hover:!text-white',
                                                            'px-3 py-2 text-sm font-medium cursor-pointer'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </li>
                                            )}
                                        {item.href.includes('/login') && (
                                            <li>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-themeColor text-white'
                                                            : 'text-black hover:bg-themeColor hover:!text-white',
                                                        'px-3 py-2 text-sm font-medium cursor-pointer'
                                                    )}
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        )}
                                    </Fragment>
                                );
                            })}
                            {loggedInUser.accessToken && (
                                <li>
                                    <Link
                                        role="button"
                                        className=" text-black'
                                                     hover:text-white hover:bg-themeColor px-3 py-2 text-sm font-medium cursor-pointer"
                                        onClick={(e) => userLogout(e)}
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
