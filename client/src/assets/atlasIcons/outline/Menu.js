import React from 'react';

const Menu = ({
    fill = 'none',
    stroke = 'currentColor',
    className = 'w-4 h-4',
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={fill}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={stroke}
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
        </svg>
    );
};

export default Menu;
