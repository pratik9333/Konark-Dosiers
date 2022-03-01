import React, { useState, useEffect, useContext } from "react";
import { useAlert } from "react-alert";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated, authenticate, signin } from "../api/Auth";
import logo from "../Images/logo.png";
import { AppContext } from "../Context/AppContext";
import { LOADING } from "../Context/action.types";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
  });

  const { dispatch } = useContext(AppContext);

  const { email, password, error, didRedirect } = values;
  const { user } = isAuthenticated();

  let alert = useAlert();

  useEffect(() => {
    window.scrollTo(1, 1);
  }, []);

  const performRedirect = () => {
    if (isAuthenticated()) {
      if (user && user.role == "admin") {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/userdashboard" />;
      }
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, Redirect: false });
    dispatch({ type: LOADING, payload: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
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
          dispatch({ type: LOADING, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: LOADING, payload: false });
        console.log(err);
      });
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
