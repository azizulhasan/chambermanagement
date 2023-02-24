import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 *
 * Utilities
 */
import { addCSS, getData } from "../../../../utilities/utilities";
export default function Footer() {
    addCSS(["/assets/front/css/footer.css"]);
    const [hero, setHero] = useState({
        _id: "",
        title: "",
        profession: "",
        social_icon_name: "",
        social_icon_url: "",
        backgroundImage: "",
        backgroundImageOpacity: "",
        icons: [],
    });
    useEffect(() => {
        /**
         * Get data from and display to table.
         */
        getData(process.env.REACT_APP_API_URL + "/api/hero").then((res) => {
            if (res.data.length) {
                setHero(res.data[0]);
            }
        });
    }, []);
    return (
        <div>
            <footer aria-label="Site Footer" className="bg-themeColor w-full pt-5">
                <div className="mx-auto max-w-screen-xl px-4 pt-8 pb-6 sm:px-6 lg:px-2 lg:pt-5">
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <div className="flex flex-shrink-0 items-center  text-black font-medium">
                                <img
                                    className="block h-10 w-auto"
                                    src="assets/front/images/mindtoheart.ogo.png"
                                    alt="Mind To Heart"
                                />
                                Mind To Heart
                            </div>

                            <div className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                                <div>
                                    <h4 className="text-2xl font-semibold text-center mb-6 text-white">
                                        Social Media Icons
                                    </h4>
                                    <div className="icons">
                                        <a href="/" className="icon icon--instagram">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                        <a href="/" className="icon icon--twitter">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                        <a href="/" className="icon icon--linkedin">
                                            <i className="fa fa-linkedin"></i>
                                        </a>
                                        <a href="/" className="icon icon--facebook">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-white pb-4">About Us</p>
                            <nav aria-label="Footer About Nav">
                                <ul className="space-y-3 text-sm">

                                    <li>
                                        <Link
                                            className="inline-block text-white  transition hover:text-white/75"
                                            to="/terms-of-services"
                                        >
                                            Terms of Services
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="inline-block text-white  transition hover:text-white/75"
                                            to="/refund-policy"
                                        >
                                            Refund Policy
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="inline-block text-white  transition hover:text-white/75"
                                            to="/privacy-policy"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-white pb-4">Our Services</p>

                            <nav aria-label="Footer Services Nav">
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a
                                            className="text-white transition hover:text-white/75"
                                            href="/"
                                        >
                                            Professionals
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-white transition hover:text-white/75"
                                            href="/"
                                        >
                                            Corporate
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-white transition hover:text-white/75"
                                            href="/"
                                        >
                                            Psychological
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-white transition hover:text-white/75"
                                            href="/"
                                        >
                                            Child Development
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-white pb-4">Contact Us</p>

                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a
                                        className="flex items-center justify-center gap-1.5 sm:justify-start"
                                        href="/"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 shrink-0 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>

                                        <span className="text-white">
                                            {" "}
                                            {" mindtoheart@gmail.com"}
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        className="flex items-center justify-center gap-1.5 sm:justify-start"
                                        href="/"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 shrink-0 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>

                                        <span className="text-white"> {" 01800000000"}</span>
                                    </a>
                                </li>

                                <li className="flex items-start justify-center gap-1.5 sm:justify-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 shrink-0 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>

                                    <address className="-mt-0.5 not-italic text-white">
                                        House #00, Road# 00, Dhanmondi, Dhaka-1200, Bangladesh
                                    </address>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    );
}
