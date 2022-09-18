import React, {useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {loginUser} from "../../../store/registerSlice";
import ReCAPTCHA from "react-google-recaptcha"
/**
 *
 * utilities
 */
import {
  postWithoutImage,
  setLocalStorage,
  setSessionStorage,
} from "../../context/utilities";
import "./assets/css/login.css";

export default function Login() {
  const navigate = useNavigate();
   const { register, handleSubmit,  formState: { errors } } = useForm();
 const captchaRef = useRef(null)
 const dispatch = useDispatch();
  useEffect(() => {});
  const handleSubmit2 = (e) => {
    e.preventDefault();

    /**
     * Get full form data and modify them for saving to database.
     */

    let form = new FormData(e.target);
    let data = {};
    for (let [key, value] of form.entries()) {
      if (key === "" || value === "") {
        alert("Please fill the value of : " + key);
        return;
      }

      data[key] = value;
    }

    // console.log(data);

    // return;

    postWithoutImage(process.env.REACT_APP_API_URL + "/api/settings/login", {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        if (res.data === true) {
          if (data.remember_me !== undefined) {
            setLocalStorage(data)
          } else {
            setSessionStorage(data)
          }
          navigate("/dashboard/mail");
          window.location.reload(false);
        } else {
          alert("Email or password is wrong.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    
    const token = captchaRef.current.getValue();
    data.token  = token;

    if(!token){
        alert('Check recaption');
        return;
    }
   dispatch(loginUser(JSON.stringify(data)))

   captchaRef.current.reset();
  };
  return (
    <div className="container">
      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center">
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
                    <form onSubmit={handleSubmit(onSubmit)}className="user">
                      <div className="form-group">
                        <div className="form-group">
                        <input
                        type={'email'}
                          {...register("email", { required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
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
                          {...register("password",{
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
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user w-100"
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
