/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../store/usersSlice';

/**
 *
 * utilities
 */
import { addCSS, setLocalStorage } from '../utilities/utilities';
import { database } from '../data/database';
const { pages: { login: { loginImage } } } = database;

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const captchaRef = useRef(null);
    const dispatch = useDispatch();
    const { loggedInUser } = useSelector((state) => state.users);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser.accessToken) {
            navigate('/');
        }
    }, [loggedInUser.accessToken, navigate]);

    const onSubmit = (data) => {
        const token = captchaRef.current.getValue();
        data.token = token;
        //Check token
        if (!token) {
            alert('Check recaption');
            return;
        }
        data.remember_me = document.getElementById('remember')?.checked;
        if (data.remember_me) {
            setLocalStorage({ remember_me: true });
            delete data.remember_me;
        }

        dispatch(loginUser(JSON.stringify(data)));
        captchaRef.current.reset();
    };

    addCSS([
        '/assets/front/css/login.css',
        '/assets/front/css/tailwind.css',
    ]);

    return (
        <div>
            {/* <!-- Outer Row --> */}

            <div className="flex flex-col xl:justify-center lg:justify-between justify-center items-center min-h-screen py-2 bg-gray-100 g-6">
                <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
                    <div className="bg-white rounded-2xl shadow-2xl sm:block md:flex lg:flex xl:flex max-w-4xl">
                        <div className="sm:hidden md:block lg:block xl:block h-image">
                            <img
                                src={loginImage}
                                alt="Login Images"
                                className="rounded-l-2xl image-height"
                            />
                        </div>

                        <div className="p-5">
                            <div className="pt-10">
                                <h2 className="text-3xl font-bold text-themeColor">
                                    Sign in to Account
                                </h2>
                                <div className="border-2 w-10 border-themeColor inline-block mb-3"></div>
                                <form
                                    className="space-y-4 md:space-y-6 mb-12 md:mb-0"
                                    action="#"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className="flex flex-col items-center">
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
                                                defaultValue={
                                                    window.sessionStorage.getItem(
                                                        'email'
                                                    ) || 'hasan@gmail.com'
                                                }
                                            />
                                            {errors.email && (
                                                <span className="error">
                                                    Emai is require.
                                                </span>
                                            )}
                                        </div>
                                        <div className="bg-gray-100 w-full p-2 flex items-center">
                                            <MdLockOutline className="text-gray-400 m-2" />
                                            <input
                                                type="password"
                                                {...register('password', {
                                                    required: true,
                                                })}
                                                className="bg-gray-100 outline-none text-sm flex-1 border-none"
                                                placeholder="Password"
                                                defaultValue={'123'}
                                            />
                                            {errors.password && (
                                                <span className="error">
                                                    Password is require.
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between w-full mt-3 mb-2">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="remember"
                                                        aria-describedby="remember"
                                                        type="checkbox"
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                        required=""
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label
                                                        htmlFor="remember_me"
                                                        className="text-gray-500 dark:text-gray-300"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <Link
                                                to="/forgotpassword"
                                                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <ReCAPTCHA
                                            className="mt-2 items-center"
                                            sitekey={
                                                process.env
                                                    .REACT_APP_RECAPTCHA_SITE_KEY
                                            }
                                            ref={captchaRef}
                                        />
                                        <button
                                            type="submit"
                                            className="border-2 border-green bg-themeColor text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-themeColor mt-3 mb-2"
                                        >
                                            Sign in
                                        </button>

                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Don’t have an account yet?{' '}
                                            <a
                                                href="/register"
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            >
                                                Sign up
                                            </a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="sm:block md:hidden lg:hidden xl:hidden">
                            <img
                                src={loginImage}
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
