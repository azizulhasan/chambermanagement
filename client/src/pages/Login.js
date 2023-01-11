/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function Login() {
  //#region Hooks
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors }} = useForm();
  const captchaRef = useRef(null);
  const dispatch = useDispatch();
  //#endregion

  //#region useEffect
  useEffect(() => {
    // const Auth = {
    //   session: getSessionStorage()["user"],
    //   storage: getLocalStorage()["user"],
    // };
    // if (Auth.session !== undefined || Auth.storage !== undefined) {
    //   window.location.href = process.env.REACT_APP_URL + "/dashboard";
    // }

    const sessionAuth = getSessionStorage()["user"];
    const localAuth = getLocalStorage()["user"];
    if (sessionAuth || localAuth ) {
      navigate("/dashboard");
    };
  }, []);
  //#endregion

  //#region Events
  const onSubmit = (data) => {
    const token = captchaRef.current.getValue();
    data.token = token;
    //Check token
    if (!token) {
      alert("Check recaption");
      return;
    }
    data.remember_me = document.getElementById("remember_me")?.value;
    if (data.remember_me !== undefined) {
      setLocalStorage({ remember_me: true });
      delete data.remember_me;
    }
    dispatch(loginUser(JSON.stringify(data)));
    captchaRef.current.reset();
  };
  //#endregion

  //#region Custom Function
  addCSS(["/assets/front/css/login.css"]);
  //#endregion

  return (
    <div>
      {/* <!-- Outer Row --> */}


      <div className="flex flex-col xl:justify-center lg:justify-between justify-center items-center min-h-screen py-2 bg-gray-100 g-6">
        <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
          <div className="bg-white rounded-2xl shadow-2xl flex max-w-4xl">
            <div className="xm:hidden">
              <img
                src={loginImage}
                alt="Login Images"
                className="rounded-l-2xl image-height"
              />
            </div>

            <div className="p-5">
              <div className="py-10">
                <h2 className="text-3xl font-bold text-green-500">
                  Sign in to Account
                </h2>
                <div className="border-2 w-10 border-green-500 inline-block mb-3"></div>
                <form
                  className="space-y-4 md:space-y-6 xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0"
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
                        className="bg-gray-100 outline-none text-sm flex-1 border-none"
                        placeholder="Enter Email Address..."
                        defaultValue={
                          window.sessionStorage.getItem("email") || ""
                        }
                      />
                      {errors.email && (
                        <span className="error">Emai is require.</span>
                      )}
                    </div>
                    <div className="bg-gray-100 w-full p-2 flex items-center">
                      <MdLockOutline className="text-gray-400 m-2" />
                      <input
                        type="password"
                        {...register("password", {
                          required: true,
                        })}
                        className="bg-gray-100 outline-none text-sm flex-1 border-none"
                        placeholder="Password"
                        defaultValue={""}
                      />
                      {errors.password && (
                        <span className="error">Password is require.</span>
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
                            for="remember_me"
                            className="text-gray-500 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <ReCAPTCHA
                      className="mt-2 items-center"
                      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                      ref={captchaRef}
                    />
                    <button
                      type="submit"
                      className="border-2 border-green bg-green-600 text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500 mt-3 mb-2"
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
    </div>
  );
}
