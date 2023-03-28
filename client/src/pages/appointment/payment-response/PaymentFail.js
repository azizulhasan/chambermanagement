import React from 'react';
import { Link } from 'react-router-dom';
import { addCSS } from '../../../utilities/utilities';

const PaymentFail = () => {
    addCSS([
        '/assets/front/css/tailwind.css',
        '/assets/front/css/carousel.css',
        '/assets/front/css/appointment.css',
    ]);
    return (
        <div className="min-h-screen flex flex-col gap-8 justify-center items-center">
            <h1 className="text-lg font-semibold">Payment Failed </h1>
            <div className="flex gap-8">
                <Link
                    to="/"
                    className="px-4 py-1 bg-themeColor text-white hover:bg-transparent hover:text-themeColor hover:outline hover:outline-[1px] hover:outline-themeColor"
                >
                    Back to Home
                </Link>
                <Link
                    to="/appointment"
                    className="px-4 py-1 bg-themeColor text-white hover:bg-transparent hover:text-themeColor hover:outline hover:outline-[1px] hover:outline-themeColor"
                >
                    Try Again
                </Link>
            </div>
        </div>
    );
};

export default PaymentFail;
