import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcumb from "./Breadcumb";

const Template = (props) => {
  return (
    <Fragment>
      <Breadcumb to="My Account" what="Dashboard" />
      <section class="user-dashboard page-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <ul class="list-inline dashboard-menu text-center">
                <li>
                  {props.active == "dashboard" ? (
                    <Link
                      className="active"
                      to={{
                        pathname: "/userdashboard",
                      }}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: "/userdashboard",
                      }}
                    >
                      Dashboard
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
                      Orders
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: "/Orders",
                        state: props.userInfo,
                      }}
                    >
                      Orders
                    </Link>
                  )}
                </li>
                <li>
                  {props.active == "address" ? (
                    <Link
                      className="active"
                      to={{
                        pathname: "/address",
                        state: props.userInfo,
                      }}
                    >
                      Active Pack Info
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: "/address",
                        state: props.userInfo,
                      }}
                    >
                      Active Pack Info
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
