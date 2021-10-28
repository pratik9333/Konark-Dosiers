import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Template = (props) => {
  return (
    <Fragment>
      <section className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content">
                <h1 className="page-name">Dashboard</h1>
                <ol className="breadcrumb">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="active">My Account</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="user-dashboard page-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <ul class="list-inline dashboard-menu text-center">
                <li>
                  {props.active == "dashboard" ? (
                    <Link className="active" to="/userdashboard">
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/userdashboard">Dashboard</Link>
                  )}
                </li>
                <li>
                  {props.active == "orders" ? (
                    <Link className="active" to="/Orders">
                      Orders
                    </Link>
                  ) : (
                    <Link to="/Orders">Orders</Link>
                  )}
                </li>
                <li>
                  {props.active == "address" ? (
                    <Link className="active" to="/address">
                      Address
                    </Link>
                  ) : (
                    <Link to="/address">Address</Link>
                  )}
                </li>
                <li>
                  {props.active == "profile" ? (
                    <Link className="active" to="/userprofile">
                      Profile
                    </Link>
                  ) : (
                    <Link to="/userprofile">Profile</Link>
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
