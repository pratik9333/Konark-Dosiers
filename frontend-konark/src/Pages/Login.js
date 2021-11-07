import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated, authenticate, signin } from "../api/Auth";

import logo from "../Images/logo.png";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
  });

  const { email, password, error, didRedirect } = values;
  const { user } = isAuthenticated();

  console.log(values);

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role == "admin") {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/userdashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(1);
    setValues({ ...values, error: false, Redirect: false });
    signin({ email, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="signin-page account">
      {performRedirect()}
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="block text-center">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
              <h2 className="text-center">Welcome Back</h2>
              <form className="text-left clearfix">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    onChange={handleChange("email")}
                    value={email}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    onChange={handleChange("password")}
                    value={password}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-main text-center"
                  >
                    Login
                  </button>
                </div>
              </form>

              <p>
                <Link> Forgot your password?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
