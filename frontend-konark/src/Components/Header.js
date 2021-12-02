import React, { Fragment, useEffect, useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../api/Auth";
import { AppContext } from "../Context/AppContext";

//Images
import logo from "../Images/logo.png";
import headerimg from "../Images/shop/header-img.jpg";

export const Header = ({ history }) => {
  const { packs } = useContext(AppContext);
  const [Packs, setPack] = useState([]);

  useEffect(() => {
    setPack(packs);
  }, []);

  return (
    <Fragment>
      <section className="top-header">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-xs-12 col-sm-4">
              <div className="contact-number">
                <i className="tf-ion-ios-telephone"></i>
                <span>9767688713</span>
              </div>
            </div>
            <div className="col-md-4 col-xs-12 col-sm-4">
              <div className="logo text-center">
                <a>
                  <img src={logo} style={{ marginTop: "30px" }} alt="" />
                </a>
              </div>
            </div>
            <div className="col-md-4 col-xs-12 col-sm-4">
              <ul className="top-menu text-right list-inline">
                <li className="dropdown search dropdown-slide">
                  <a href="#!"> Recharge</a>
                </li>

                <li className="dropdown search dropdown-slide">
                  <a
                    style={{ cursor: "pointer" }}
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    data-hover="dropdown"
                  >
                    <i className="tf-ion-ios-search-strong"></i> Search
                  </a>
                  <ul className="dropdown-menu search-dropdown">
                    <li>
                      <form action="post">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search..."
                        />
                      </form>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="menu">
        <nav className="navbar navigation">
          <div className="container">
            <div className="navbar-header"></div>

            <div id="navbar" className="navbar-collapse collapse text-center">
              <ul className="nav navbar-nav">
                <li className="dropdown ">
                  <Link to="/" className="text-bold">
                    Home
                  </Link>
                </li>

                {!isAuthenticated() && (
                  <li className="dropdown ">
                    <Link to="/login" className="text-bold">
                      Login
                    </Link>
                  </li>
                )}

                <li className="dropdown full-width dropdown-slide">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    data-hover="dropdown"
                    data-delay="350"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    DTH <span className="tf-ion-ios-arrow-down"></span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="row">
                      <div className="col-sm-3 col-xs-12">
                        <ul>
                          <li className="dropdown-header">Pages</li>
                          <li role="separator" className="divider"></li>
                          <li>
                            <Link to="/contact">Contact Us</Link>
                          </li>
                          <li>
                            <Link to="/about">About Us</Link>
                          </li>
                          <li>
                            <Link to="/">Coming Soon</Link>
                          </li>
                          <li>
                            <Link to="/faq">FAQ</Link>
                          </li>
                        </ul>
                      </div>

                      <div className="col-sm-3 col-xs-12">
                        <ul>
                          <li className="dropdown-header">User</li>
                          <li role="separator" className="divider"></li>
                          <li>
                            <Link to="/userdashboard">User Dashboard</Link>
                          </li>
                          <li>
                            <Link to="/orders">Orders</Link>
                          </li>
                          <li>
                            <Link to="/address">Address</Link>
                          </li>
                          <li>
                            <Link to="/userprofile">Profile Details</Link>
                          </li>
                        </ul>
                      </div>

                      <div className="col-sm-3 col-xs-12">
                        <ul>
                          <li className="dropdown-header">Utilities</li>
                          <li role="separator" className="divider"></li>
                          <li>
                            <Link to="/">Recharge Plan</Link>
                          </li>
                          <li>
                            <Link to="/newconnection">Buy New Connection</Link>
                          </li>
                        </ul>
                      </div>

                      <div className="col-sm-3 col-xs-12">
                        <a href="">
                          <img
                            className="img-responsive"
                            src={headerimg}
                            alt="menu image"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="dropdown dropdown-slide">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    data-hover="dropdown"
                    data-delay="350"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    View Packs
                    <span
                      className="tf-ion-ios-arrow-down"
                      style={{ marginLeft: "4px" }}
                    ></span>
                  </a>
                  <ul className="dropdown-menu">
                    {Packs.map((pack) => (
                      <li>
                        <Link to={{ pathname: "/packs", state: Packs }}>
                          {pack.packname}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="dropdown dropdown-slide">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    data-hover="dropdown"
                    data-delay="350"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Help
                    <span
                      className="tf-ion-ios-arrow-down"
                      style={{ marginLeft: "4px" }}
                    ></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/contact">Contact US</Link>
                    </li>
                  </ul>
                </li>
                {isAuthenticated() && (
                  <li
                    className="dropdown text-danger"
                    style={{ color: "red" }}
                    onClick={() => {
                      signout();
                    }}
                  >
                    <Link style={{ color: "red" }} to="/login">
                      Signout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </Fragment>
  );
};

export default withRouter(Header);
