import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../store/usersSlice";
import ReCAPTCHA from "react-google-recaptcha"
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

    const token = captchaRef.current.getValue();
    data.token = token;

    if (!token) {
      alert('Check recaption');
      return;
    }
    data.remember_me = document.getElementById('remember_me').value
    if (data.remember_me !== undefined) {
      setLocalStorage({ remember_me: true })
      delete data.remember_me
    }
    dispatch(loginUser(JSON.stringify(data)))

    captchaRef.current.reset();
  };


  return (
    <div className="container">
      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center ">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="user">
                      <div className="form-group">
                        <div className="form-group">
                          <input
                            type={'email'}
                            {...register("email", {
                              required: true,
                              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                            className="form-control form-control-user"
                            placeholder="Enter Email Address..."
                            defaultValue={window.sessionStorage.getItem('email') || ''}
                          />
                          {errors.email && <span className="error">Emai is require.</span>}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          {...register("password", {
                            required: true,
                          })}
                          className="form-control form-control-user"
                          placeholder="Password"
                          defaultValue={''}
                        />
                        {errors.password && <span className="error">Password is require.</span>}
                      </div>
                      <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        ref={captchaRef}
                      />
                      <div className="form-group my-2">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            name="remember_me"
                            className="custom-control-input"
                            id="remember_me"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="remember_me"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user w-100 bg-themeColor border border-themeColor text-white py-[5px] px-12 mb-[100px]  "
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
