import React, {useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {registerUser} from "../store/usersSlice";
import ReCAPTCHA from "react-google-recaptcha"

import {
  getSessionStorage,
  getLocalStorage
} from "../utilities/utilities";
import "../components/front/home/assets/css/register.css";

export default function Register() {
 const { register, handleSubmit,  formState: { errors } } = useForm();
 const captchaRef = useRef(null)

const [ user, setUser ] = useState( () => {
    return {
        name: 'azizul hasan',
        phone: '23523463546',
        email: 'azizulhasan.cr@gmail.com',
        password: '123',
        confirmPassword: '123',
    }
});
 const dispatch = useDispatch();



 useEffect(()=>{
    const Auth = {
    session: getSessionStorage()['user'],
    storage: getLocalStorage()['user'],
  };
  if (
    ( Auth.session !== undefined || Auth.storage !== undefined ) ) {
    window.location.href = process.env.REACT_APP_URL + "/dashboard";
  }
 }, [])
  const onSubmit = (data) => {
    if(data.password !== data.confirmPassword ){
        alert("Password did not match.")
            return
    }
    const token = captchaRef.current.getValue();
    data.token  = token;

    if(!token){
        alert('Check recaption');
        return;
    }
   dispatch(registerUser(JSON.stringify(data)))

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
                      <h1 className="h4 text-gray-900 mb-4">Welcome To Mind To Heart!</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}className="user">
                    <div className="form-group">
                        <input
                          type="text"
                           {...register("name", { required: true, maxLength: 50})}
                          className="form-control form-control-user"
                          placeholder="Enter name "
                          defaultValue={user.name}
                        />
                        {errors.name && <span className="error">Name is required.</span>}
                      </div>
                      <div className="form-group">
                        <input
                        type='number'
                          {...register("phone", { required: true})}
                          className="form-control form-control-user"
                          placeholder="Enter phone number..."
                          defaultValue={user.phone}
                        />
                        {errors.phone && <span className="error">Phone is require.</span>}
                      </div>
                      <div className="form-group">
                        <input
                        type={'email'}
                          {...register("email", { required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                          className="form-control form-control-user"
                          placeholder="Enter Email Address..."
                          defaultValue={user.email}
                        />
                        {errors.email && <span className="error">Emai is require.</span>}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          {...register("password",{
                            required: true,
                          })}
                          className="form-control form-control-user"
                          placeholder="Password"
                          defaultValue={user.password}
                        />
                        {errors.password && <span className="error">Password is require.</span>}
                      </div>
                      <div className="form-group">
                        <input
                        type={'password'}
                          {...register("confirmPassword",{
                            required: true,
                          })}
                          className="form-control form-control-user"
                          placeholder="confirmPassword"
                          defaultValue={user.confirmPassword}
                        />
                        {errors.confirmPassword && <span className="error">confirmPassword is require.</span>}
                      </div>
                        <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        ref={captchaRef}
                        />
                      <button
                        type="submit"
                        className="btn btn-primary btn-user w-100"
                      >
                        Register
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
