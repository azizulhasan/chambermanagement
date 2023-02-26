import React from 'react';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';

export default function ScrollToTop() {
    return (
        <>
            {/* <div id="preloader"></div> */}
            <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="back-to-top flex items-end justify-end float-right mr-3 mb-3 "
            >
                <ArrowUpCircleIcon className="h-6 w-6" aria-hidden="true" />
            </a>
        </>
    );
}
