import React from 'react';

const ArrowDown = ({
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
        </svg>
    );
};

export default ArrowDown;
