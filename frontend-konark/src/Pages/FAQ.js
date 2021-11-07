import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Breadcumb from "../Components/Breadcumb";

const Faq = () => {
  return (
    <Fragment>
      <Breadcumb to="FAQ" what="FAQ" />
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
