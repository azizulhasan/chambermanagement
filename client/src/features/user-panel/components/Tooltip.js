import React, { useEffect, useState } from 'react';

const Tooltip = ({ children, text, time = 2000, position = '' }) => {
    const [show, setShow] = useState(false);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (touched) {
            setTimeout(() => {
                setShow(false);
                setTouched(false);
            }, time);
        }
    }, [touched, time]);

    return (
        <div
            onTouchStartCapture={(e) => {
                e.preventDefault();
                setTouched(true);
                setShow(true);
            }}
            onMouseEnter={() => {
                setShow(true);
            }}
            onMouseLeave={() => {
                setShow(false);
            }}
            className="relative"
        >
            {children}
            {show ? (
                <div
                    className={`absolute -top-1/2 left-1/2 ${position} w-fit px-2 border z-10 bg-gray-700 text-white rounded-md`}
                >
                    {text}
                </div>
            ) : null}
        </div>
    );
};

export default Tooltip;
