import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {registerUser} from "../../../store/registerSlice";



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
import "./assets/css/register.css";
import { Toast } from "react-bootstrap";
import notify from "../../context/Notify";

export default function Register() {
  const navigate = useNavigate();
 const { register, handleSubmit,  formState: { errors } } = useForm();
const [ user, setUser ] = useState( () => {
    return {
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
});
 const dispatch = useDispatch();
const handleChange = (e) => {
    setUser( {...user, ...{[e.target.name] : e.target.value }} ) ;
}
  useEffect(() => {});
  const onSubmit = (data) => {
    if(data.password !== data.confirmPassword ){
        alert("Password did not match.")
            return
    }
    dispatch(registerUser(data))
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
                        <input
                          type="text"
                           {...register("name", { required: true, maxLength: 50})}
                          className="form-control form-control-user"
                          placeholder="Enter name "
                        />
                        {errors.name && <span className="error">Name is required.</span>}
                      </div>
                      <div className="form-group">
                        <input
                        type='number'
                          {...register("phone", { required: true})}
                          className="form-control form-control-user"
                          placeholder="Enter phone Address..."
                        />
                        {errors.phone && <span className="error">Phone is require.</span>}
                      </div>
                      <div className="form-group">
                        <input
                        type={'email'}
                          {...register("email", { required: true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                          className="form-control form-control-user"
                          placeholder="Enter Email Address..."
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
                        />
                        {errors.confirmPassword && <span className="error">confirmPassword is require.</span>}
                      </div>
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
