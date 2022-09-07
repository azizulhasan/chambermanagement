import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {});
  const handleSubmit = (e) => {
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
                    <form onSubmit={handleSubmit} className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          defaultValue=""
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          defaultValue=""
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                        />
                      </div>
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
