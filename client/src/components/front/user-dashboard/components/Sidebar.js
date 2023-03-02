import React from 'react';
import { NavLink } from 'react-router-dom';

const tabs = [
    {
        name: 'Schedule',
        link: 'schedule',
        icon: 'schedule',
    },
    {
        name: 'Settings',
        link: 'settings',
        icon: 'setting',
    },
];

const Sidebar = ({ closeModal }) => {
    const commonStyle = 'w-full py-1 px-2 flex gap-2 font-semibold ';
    const inactiveStyle = commonStyle + ' text-gray-800/80';
    const activeStyle = commonStyle + ' bg-themeColor text-white rounded-md';
    return (
        <div className="m-4">
            <ul className="flex flex-col gap-1">
                {tabs.map((tab) => (
                    <li key={tab.name} className="flex">
                        <NavLink
                            to={tab.link}
                            className={({ isActive }) =>
                                isActive ? activeStyle : inactiveStyle
                            }
                            onClick={closeModal}
                        >
                            <i className={`uil uil-${tab.icon}`}></i>
                            <p>{tab.name}</p>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
