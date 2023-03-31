import React from 'react';
import { Link } from 'react-router-dom';
import { addCSS } from '../utilities/utilities';

const PaymentCancel = () => {
    addCSS([
        '/assets/front/css/tailwind.css',
        '/assets/front/css/carousel.css',
        '/assets/front/css/appointment.css',
    ]);
    return (
        <div className="min-h-screen flex flex-col gap-8 justify-center items-center">
            <h1 className="text-lg font-semibold">
                Book the session by proceeding to pay or to abort the session
                cancel it
            </h1>
            <div className="flex gap-8">
                <a
                    href="https://sandbox.sslcommerz.com/EasyCheckOut/testcde642bb4c5dbaca61f4581e6b5033d8ad2"
                    className="px-4 py-1 bg-themeColor text-white hover:bg-transparent hover:text-themeColor hover:outline hover:outline-[1px] hover:outline-themeColor"
                >
                    Proceed to Pay
                </a>
                <Link
                    to="/"
                    className="px-4 py-1 bg-themeColor text-white hover:bg-transparent hover:text-themeColor hover:outline hover:outline-[1px] hover:outline-themeColor"
                >
                    Cancel
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancel;
