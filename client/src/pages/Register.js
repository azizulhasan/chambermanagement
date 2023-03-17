import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { registerUser } from '../store/usersSlice';
import ReCAPTCHA from 'react-google-recaptcha';
import retistrationImage from '../assets/registration/registration_page.PNG';
import { FaRegEnvelope, FaRegUser } from 'react-icons/fa';
import { MdLockOutline, MdPhone } from 'react-icons/md';

import {
    getSessionStorage,
    getLocalStorage,
    addCSS,
} from '../utilities/utilities';
import { useNavigate } from 'react-router-dom';

const initialUser = {
    name: 'azizul hasan',
    phone: '23523463546',
    email: 'azizulhasan.cr@gmail.com',
    password: '123',
    confirmPassword: '123',
};

export default function Register() {
    //#region Hooks
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const captchaRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //#endregion

    //#region States
    const [user, setUser] = useState(initialUser);
    //#endregion

    //#region useEffect
    // useEffect(() => {
    //     const Auth = {
    //         session: getSessionStorage()['user'],
    //         storage: getLocalStorage()['user'],
    //     };
    //     console.log({ ...Auth });
    //     if (Auth.session !== undefined || Auth.storage !== undefined) {
    //~ window.location.href = process.env.REACT_APP_URL + "/dashboard";
    //         navigate('/dashboard');
    //     }
    // }, [navigate]);
    //#endregion

    //#region Events
    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            alert('Password did not match.');
            return;
        }
        const token = captchaRef.current.getValue();
        data.token = token;

        if (!token) {
            alert('Check recaption');
            return;
        }
        dispatch(registerUser(JSON.stringify(data)));
        captchaRef.current.reset();
    };
    //#endregion

    //#region Custom Functions
    addCSS([
        '/assets/front/css/register.css',
        '/assets/front/css/tailwind.css',
    ]);
    //#endregion

    return (
        <div>
            {/* <!-- Outer Row --> */}

            <div className="flex flex-col xl:justify-center lg:justify-between justify-center items-center min-h-screen py-2 bg-gray-100 g-6">
                <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
                    <div className="bg-white rounded-2xl shadow-2xl sm:block md:flex lg:flex xl:flex max-w-4xl">
                        <div className="sm:hidden md:block lg:block xl:block h-image">
                            <img
                                src={retistrationImage}
                                alt="Login Images"
                                className="rounded-l-2xl image-height"
                            />
                        </div>
                        {/* Registration From start */}
                        <div className="px-5">
                            <div className="py-5">
                                <h2 className="text-3xl font-bold text-themeColor">
                                    Sign Up Form
                                </h2>
                                <div className="border-2 w-10 border-themeColor inline-block mb-3"></div>
                                <form
                                    className="space-y-4 md:space-y-6 mb-12 md:mb-0"
                                    action="#"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className="flex flex-col items-center">
                                        {/* User Name start */}
                                        <div className="bg-gray-100 w-full p-2 flex items-center mb-3">
                                            <FaRegUser className="text-gray-400 m-2" />
                                            <input
                                                type="text"
                                                {...register('name', {
                                                    required: true,
                                                    maxLength: 50,
                                                })}
                                                className="bg-gray-100 outline-none text-sm flex-1 border-none"
                                                placeholder="Enter name "
                                                defaultValue={user.name}
                                            />
                                            {errors.name && (
                                                <span className="error">
                                                    Name is required.
                                                </span>
                                            )}
                                        </div>
                                        {/* User Name End */}

                                        {/* Phone Number start */}
                                        <div className="bg-gray-100 w-full p-2 flex items-center mb-3">
                                            <MdPhone className="text-gray-400 m-2" />
                                            <input
                                                type="number"
                                                {...register('phone', {
                                                    required: true,
                                                })}
                                                className="bg-gray-100 outline-none text-sm flex-1 border-none"
                                                placeholder="Enter phone number..."
                                                defaultValue={user.phone}
                                            />
                                            {errors.phone && (
                                                <span className="error">
                                                    Phone is require.
                                                </span>
                                            )}
                                        </div>
                                        {/* Phone Number End */}

                                        {/* Email start */}
                                        <div className="bg-gray-100 w-full p-2 flex items-center mb-3">
                                            <FaRegEnvelope className="text-gray-400 m-2" />
                                            <input
                                                type={'email'}
                                                {...register('email', {
                                                    required: true,
                                                    pattern:
                                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                })}
                                                className="bg-gray-100 outline-none text-sm flex-1 border-none"
                                                placeholder="Enter Email Address..."
                                                defaultValue={user.email}
                                            />
                                            {errors.email && (
                                                <span className="error">
                                                    Email is require.
                                                </span>
                                            )}
                                        </div>
                                        {/* Email End */}

                                        {/* Password start */}
                                        <div className="bg-gray-100 w-full p-2 flex items-center mb-3">
                                            <MdLockOutline className="text-gray-400 m-2" />
                                            <input
                                                type="password"
                                                {...register('password', {
                                                    required: true,
                                                })}
                                                className="bg-gray-100 outline-none text-sm flex-1 border-none"
                                                placeholder="Password"
                                                defaultValue={user.password}
                                            />
                                            {errors.password && (
                                                <span className="error">
                                                    Password is require.
                                                </span>
                                            )}
                                        </div>
                                        {/* Password End */}

                                        {/* Confirm Password start */}
                                        <div className="bg-gray-100 w-full p-2 flex items-center">
                                            <MdLockOutline className="text-gray-400 m-2" />
                                            <input
                                                type={'password'}
                                                {...register(
                                                    'confirmPassword',
                                                    {
                                                        required: true,
                                                    }
                                                )}
                                                className="bg-gray-100 outline-none text-sm flex-1 border-none"
                                                placeholder="confirmPassword"
                                                defaultValue={
                                                    user.confirmPassword
                                                }
                                            />
                                            {errors.confirmPassword && (
                                                <span className="error">
                                                    confirmPassword is require.
                                                </span>
                                            )}
                                        </div>
                                        {/* Confirm Password End */}

                                        {/* Captcha start */}
                                        <ReCAPTCHA
                                            className="mt-2 items-center"
                                            sitekey={
                                                process.env
                                                    .REACT_APP_RECAPTCHA_SITE_KEY
                                            }
                                            ref={captchaRef}
                                        />
                                        {/* Captcha End */}

                                        {/* Register button start */}
                                        <button
                                            type="submit"
                                            className="border-2 border-green bg-themeColor text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-themeColor mt-3 mb-2"
                                        >
                                            Register
                                        </button>
                                        {/* Register Button End */}
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* Registration From End */}

                        <div className="sm:block md:hidden lg:hidden xl:hidden">
                            <img
                                src={retistrationImage}
                                alt="Login Images"
                                className="rounded-l-2xl image-height"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
