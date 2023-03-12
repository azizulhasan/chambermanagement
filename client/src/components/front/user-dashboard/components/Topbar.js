import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../../../store/usersSlice';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Modal from './Modal';
import Navbar from './Sidebar';

const Topbar = () => {
    const [open, setOpen] = useState(false);
    const [render, setRender] = useState(false);
    const { width } = useWindowDimensions();
    const { loggedInUser } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openModal = () => {
        !render && setRender(true);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open && width >= 640) {
            closeModal();
        }
    }, [open, width]);

    const userLogout = (e) => {
        e.preventDefault();
        alert('Are you sure?');
        console.log('after are you sure');
        dispatch(logOut());
        navigate('/');
    };

    return (
        <div className="h-full flex items-center justify-between px-4  drop-shadow-md border-b border-gray-400/20 backdrop-blur">
            <Link
                to="/"
                className="flex flex-shrink-0 items-center  text-black font-medium"
            >
                <div className="flex flex-shrink-0 items-center  text-black font-medium">
                    <img
                        className="block h-10 w-auto lg:hidden"
                        src={`${process.env.REACT_APP_URL}/assets/front/images/mindtoheart.ogo.png`}
                        alt="Mind To Heart"
                    />
                    <img
                        className="hidden h-8 w-auto lg:block"
                        src={`${process.env.REACT_APP_URL}/assets/front/images/mindtoheart.ogo.png`}
                        alt="Mind To Heart"
                    />
                    Mind To Heart
                </div>
            </Link>
            {/* </Link> */}
            <div className="flex gap-2.5">
                <Link
                    role="button"
                    className=" text-black hover:text-white hover:bg-themeColor px-3 py-2 text-sm font-medium cursor-pointer"
                    onClick={(e) => userLogout(e)}
                >
                    Logout
                </Link>

                <button className="block sm:hidden" onClick={openModal}>
                    <i className="uil uil-bars"></i>
                </button>
            </div>

            {render && (
                <Modal
                    open={open}
                    closeModal={closeModal}
                    stylingClasses={`${
                        open ? 'open-sidebar' : 'close-sidebar'
                    }`}
                >
                    <Navbar closeModal={closeModal} />
                </Modal>
            )}
        </div>
    );
};

export default Topbar;
