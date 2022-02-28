import React, { Fragment } from "react";
import Breadcumb from "../Components/Breadcumb";

const Faq = () => {
  return (
    <Fragment>
      <Breadcumb to="FAQ" what="FAQ" />
      <section className="page-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Frequently Asked Questions</h2>
              <p>blah</p>
              <p>admin@mail.com</p>
            </div>
            <div className="col-md-8">
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
