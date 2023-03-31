import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserPanelMenus } from '../../../data/database';

const menus = UserPanelMenus;

const Sidebar = ({ closeModal }) => {
    const commonStyle =
        'w-full py-1 px-2 flex items-center gap-2 font-semibold ';
    const inactiveStyle =
        commonStyle + ' text-gray-800/80 hover:bg-themeColor/10 rounded-md';
    const activeStyle = commonStyle + ' bg-themeColor text-white rounded-md';
    return (
        <div className="m-4">
            <ul className="flex flex-col gap-1">
                {menus.map(({ name, link, Icon }) => (
                    <li key={name} className="flex">
                        <NavLink
                            to={link}
                            className={({ isActive }) =>
                                isActive ? activeStyle : inactiveStyle
                            }
                            onClick={closeModal}
                        >
                            <Icon />
                            <p>{name}</p>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
