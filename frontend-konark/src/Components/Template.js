import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcumb from "./Breadcumb";

const Template = (props) => {
  return (
    <Fragment>
      <Breadcumb to="My Account" what="Dashboard" />
      <section className="user-dashboard page-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="list-inline dashboard-menu text-center">
                <li>
                  {props.active == "dashboard" ? (
                    <Link
                      className="active"
                      to={{
                        pathname: "/userdashboard",
                      }}
                    >
                      Profile Details
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: "/userdashboard",
                      }}
                    >
                      Profile Details
                    </Link>
                  )}
                </li>
                <li>
                  {props.active == "orders" ? (
                    <Link
                      className="active"
                      to={{
                        pathname: "/Orders",
                        state: props.userInfo,
                      }}
                    >
                      Orders Detail
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: "/Orders",
                        state: props.userInfo,
                      }}
                    >
                      Orders Detail
                    </Link>
                  )}
                </li>
                <li>
                  {props.active == "address" ? (
                    <Link
                      className="active"
                      to={{
                        pathname: "/packdetails",
                        state: props.userInfo,
                      }}
                    >
                      Pack Details
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: "/packdetails",
                        state: props.userInfo,
                      }}
                    >
                      Pack Detail
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Template;
