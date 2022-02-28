import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated, authenticate, signin } from "../api/Auth";
import logo from "../Images/logo.png";
import { Spinner } from "react-spinners-css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
  });

  const [loading, setloading] = useState(false);

  const { email, password, error, didRedirect } = values;
  const { user } = isAuthenticated();

  let alert = useAlert();

  useEffect(() => {
    window.scrollTo(1, 1);
  }, []);

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
    setloading(!loading);
    event.preventDefault();
    setValues({ ...values, error: false, Redirect: false });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
          setloading(false);
        } else {
          setloading(false);
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

  const fadePage = {
    opacity: "0.6",
  };
  const unFadePage = {
    opacity: "1",
  };

  return (
    <section
      className="signin-page account"
      style={loading ? fadePage : unFadePage}
    >
      {performRedirect()}
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="block text-center">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
              <h2 className="text-center">Welcome Back</h2>
              <span
                style={{
                  display: loading ? "flex" : "none",
                  justifyContent: "center",
                  position: "absolute",
                  left: "0",
                  right: "0",
                }}
              >
                <Spinner color="#000" size={50} />
              </span>
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
