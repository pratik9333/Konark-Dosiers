import React, { Fragment } from "react";
import { Link } from "react-router-dom";
//Images
import logo from "../Images/logo.png";
import headerimg from "../Images/shop/header-img.jpg";

export const Header = () => {
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
                  <img src={logo} alt="" />
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

                <li className="dropdown ">
                  <Link to="/" className="text-bold">
                    Login
                  </Link>
                </li>

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
                            <Link to="/">Buy New COnnection</Link>
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
                    Packs & Channels{" "}
                    <span className="tf-ion-ios-arrow-down"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#">Single Channels</a>
                    </li>
                    <li>
                      <a href="#">Konark Combos</a>
                    </li>
                    <li>
                      <a href="#">Konark Add-ons</a>
                    </li>
                    <li>
                      <a href="#">Broadcaster Bouquets</a>
                    </li>
                    <li>
                      <a href="#">Free-To-Air (FTA) packs</a>
                    </li>
                    <li>
                      <a href="#">Make your own pack</a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown ">
                  <Link to="/">Signout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </Fragment>
  );
};
