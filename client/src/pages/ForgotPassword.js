/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login/login_page.PNG";
import { loginUser } from "../store/usersSlice";
/**
 *
 * utilities
 */
import {
    addCSS,
    getLocalStorage,
    getSessionStorage,
    setLocalStorage,
} from "../utilities/utilities";

export default function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const captchaRef = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //#region Events
    const onSubmit = (data) => {

        data.timeStart = new Date().getTime()
        console.log(data)
        // dispatch(registerUser(JSON.stringify(data)));
    };
    //#endregion

    //#region Custom Function
    addCSS(["/assets/front/css/login.css"]);
    //#endregion
    return (
        <div className="flex flex-col xl:justify-center lg:justify-between justify-center items-center min-h-screen py-2 bg-gray-100 g-6">
            <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
                <div className="bg-white rounded-2xl shadow-2xl sm:block md:flex lg:flex xl:flex w-[400px]">
                    <div className="p-5">
                        <div className="pt-10">
                            <h2 className="text-3xl font-bold text-themeColor">
                                Enter Your Email
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
                                            type={"email"}
                                            {...register("email", {
                                                required: true,
                                                pattern:
                                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            })}
                                            className="bg-gray-100 outline-none text-sm flex-1 border-none "
                                            placeholder="Enter Email Address..."
                                            defaultValue={
                                                window.sessionStorage.getItem("email") || ""
                                            }
                                        />
                                        {errors.email && (
                                            <span className="error">Emai is require.</span>
                                        )}
                                    </div>
                                    <ReCAPTCHA
                                        className="mt-2 items-center"
                                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                        ref={captchaRef}
                                    />
                                    <button
                                        type="submit"
                                        className="border-2 border-green bg-themeColor text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-themeColor mt-3 mb-2"
                                    >
                                        Sign in
                                    </button>

                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet?{" "}
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

                </div>
            </main>
        </div>
    );
}
