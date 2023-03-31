/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
/**
 *
 * Utilities
 */
import {
    setUserAddress,
    getFormattedDate,
    getUserAddress,
} from '../../../../../utilities/utilities';
import submitContactForm from '../../../../../utilities/validate';
import GoogleMap from './GoogleMap';
export default function Contact({ id = 'contact' }) {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        isMailToSender: false,
        message: '',
        date: getFormattedDate(),
    });

    useEffect(() => {
        setUserAddress(window.navigator)
    }, [])


    /**
     * Handle content change value.
     * @param {event} e
     */
    const handleChange = (e) => {
        let value = e.target.value;
        if ('isMailToSender' === e.target.name) {
            value = e.target.checked;
        }
        setContactForm({
            ...contactForm,
            ...{ [e.target.name]: value },
        });
    };


    const subForm = async (e) => {
        let res = await submitContactForm(e)
        if (res) {
            setContactForm({
                name: '',
                email: '',
                subject: '',
                isMailToSender: false,
                message: '',
                date: getFormattedDate(),
            })
        }
    }

    return (
        <div id={id} className="flex flex-col-reverse gap-10 sm:flex-row mb-10">
            <div className="flex-1">
                <GoogleMap />
            </div>

            <div className="flex-1">
                <div className="block rounded-lg shadow-lg px-6 py-12 md:px-12 ">
                    <h2 className="text-3xl font-bold mb-12">Contact us</h2>
                    <form
                        onSubmit={(e) => subForm(e)}
                        className="php-email-form"
                    >
                        <div className="form-group mb-6">
                            <input
                                type="text"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                value={contactForm.name}
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="form-group mb-6">
                            <input
                                type="email"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Email address"
                                name="email"
                                onChange={handleChange}
                                value={contactForm.email}
                                id="email"
                                required
                            />
                        </div>
                        <div className="form-group mb-6">
                            <input
                                type="subject"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Subject"
                                name="subject"
                                onChange={handleChange}
                                value={contactForm.subject}
                                id="subject"
                                required
                            />
                        </div>
                        <div className="form-group mb-6">
                            <textarea
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="message"
                                rows="3"
                                placeholder="Message"
                                name="message"
                                onChange={handleChange}
                                value={contactForm.message}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group form-check text-center mb-6">
                            <input
                                type="checkbox"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-themeColor checked:border-themeColor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                                id="isMailToSender"
                                name="isMailToSender"
                                checked={contactForm.isMailToSender}
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label inline-block text-gray-800"
                                htmlFor="isMailToSender"
                            >
                                Send me a copy of this message
                            </label>
                        </div>
                        <div className="loading hidden bg-themeColor mb-2  px-2 py-1 text-white">Loading</div>
                        <div className="error-message hidden  bg-red-500 mb-2 px-2 py-1 text-white"></div>
                        <div className="sent-message hidden bg-themeColor mb-2 px-2 py-1 text-white">
                            Your message has been sent. Thank you!
                        </div>

                        <button
                            type="submit"
                            className="w-full px-3 py-2 text-sm font-medium text-center text-white bg-themeColor rounded-lg hover:bg-white hover:text-themeColor focus:ring-4 focus:outline-none focus:ring-themeColor dark:bg-themeColor dark:hover:bg-themeColor dark:focus:ring-themeColor hover:border hover:border-themeColor"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
