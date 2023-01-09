/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../store/usersSlice";
import ReCAPTCHA from "react-google-recaptcha";
import {FaRegEnvelope} from 'react-icons/fa';
import {MdLockOutline} from 'react-icons/md';
/**
 *
 * utilities
 */
import {
  postWithoutImage,
  setLocalStorage,
  setSessionStorage,
  getSessionStorage,
  getLocalStorage,
  addCSS
} from "../utilities/utilities";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const captchaRef = useRef(null)
  const dispatch = useDispatch();

  useEffect(() => {
    const Auth = {
      session: getSessionStorage()['user'],
      storage: getLocalStorage()['user'],
    };
    if (
      (Auth.session !== undefined || Auth.storage !== undefined)) {
      window.location.href = process.env.REACT_APP_URL + "/dashboard";
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);

    const token = captchaRef.current.getValue();
    data.token = token;

    if (!token) {
      alert('Check recaption');
      return;
    }
    data.remember_me = document.getElementById('remember_me')?.value
    if (data.remember_me !== undefined) {
      setLocalStorage({ remember_me: true })
      delete data.remember_me
    }
    dispatch(loginUser(JSON.stringify(data)))

    captchaRef.current.reset();
  };

  addCSS([
    '/assets/front/css/login.css'
  ])
  return (
    <div>
      {/* <!-- Outer Row --> */}

      {/* <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

      <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center mb-2">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group pt-1">
                        <div className="form-group">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input
                            type={'email'}
                            {...register("email", {
                              required: true,
                              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Enter Email Address..."
                            defaultValue={window.sessionStorage.getItem('email') || ''}
                          />
                          {errors.email && <span className="error">Emai is require.</span>}
                        </div>
                      </div>
                  <div className="form-group pt-1">
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                          type="password"
                          {...register("password", {
                            required: true,
                          })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Password"
                          defaultValue={''}
                        />
                        {errors.password && <span className="error">Password is require.</span>}
                      </div>
                      <ReCAPTCHA
                      className="mt-2"
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        ref={captchaRef}
                      />
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember_me" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>           
                  <button type="submit" className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 justify-content-center">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section> */}

<div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
  <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
    <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
      <div className="w-3/5 p-5">
        {/* <div className="text-left font-bold"><span className="text-green-500">Company</span> Name</div> */}
        <div className="py-10">
          <h2 className="text-3xl font-bold text-green-500">Sign in to Account</h2>
          <div className="border-2 w-10 border-green-500 inline-block mb-3"></div>
          <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-full p-2 flex items-center mb-3">
              <FaRegEnvelope className="text-gray-400 m-2"/>
              <input
                            type={'email'}
                            {...register("email", {
                              required: true,
                              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                            className="bg-gray-100 outline-none text-sm flex-1 border-none" 
                            placeholder="Enter Email Address..."
                            defaultValue={window.sessionStorage.getItem('email') || ''}
                          />
                          {errors.email && <span className="error">Emai is require.</span>}
            </div>
            <div className="bg-gray-100 w-full p-2 flex items-center">
              <MdLockOutline className="text-gray-400 m-2"/>
              <input
                          type="password"
                          {...register("password", {
                            required: true,
                          })}
                          className="bg-gray-100 outline-none text-sm flex-1 border-none"
                          placeholder="Password"
                          defaultValue={''}
                        />
                        {errors.password && <span className="error">Password is require.</span>}
            </div>
            <ReCAPTCHA
                      className="mt-2"
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        ref={captchaRef}
                      />
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember_me" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 justify-content-center mt-2">Sign in</button>
 
          </div>
          </form>
        </div>
      </div>

      <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
        <h2 className="text-3xl font-bold mb-2 mt-5">Hello!!</h2>
        <div className="border-2 w-10 border-white inline-block mb-2">
          <p className="mb-2">For Registration Click signup</p>
          <a href="" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500 mt-5">Sign Up</a>
        </div>
      </div>
    </div>
  </main>
</div>
    </div>
  );
}
