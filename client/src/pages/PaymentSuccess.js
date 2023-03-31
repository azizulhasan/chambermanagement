import React from 'react';
import { Link } from 'react-router-dom';
import { addCSS } from '../utilities/utilities';

const PaymentSuccess = () => {
    addCSS([
        '/assets/front/css/tailwind.css',
        '/assets/front/css/carousel.css',
        '/assets/front/css/appointment.css',
    ]);
    return (
        <div className="min-h-screen flex flex-col gap-8 justify-center items-center">
            <h1 className="text-lg font-semibold">
                Congratulations, Payment Successful
            </h1>
            <Link
                to="/"
                className="px-4 py-1 bg-themeColor text-white hover:bg-transparent hover:text-themeColor hover:outline hover:outline-[1px] hover:outline-themeColor"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default PaymentSuccess;
