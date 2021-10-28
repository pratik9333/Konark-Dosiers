import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <Fragment>
      <section class="page-header">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="content">
                <h1 class="page-name">Frequently Asked Questions</h1>
                <ol class="breadcrumb">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/FAQ">F.A.Q</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="page-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <h2>Frequently Asked Questions</h2>
              <p>blah</p>
              <p>admin@mail.com</p>
            </div>
            <div class="col-md-8">
              <h4>Order Status</h4>
              <p>BLAH</p>
              <h4>Shipping & Delivery</h4>
              <p>blah</p>
              <h4>Payments</h4>
              <p>blah</p>
              <h4>Returns & Exchanges</h4>
              <p>blah</p>
              <h4>Privacy Policy</h4>
              <p>blah</p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Faq;
