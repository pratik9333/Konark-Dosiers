import React, { Fragment } from "react";
import Breadcumb from "../Components/Breadcumb";

const Faq = () => {
  return (
    <Fragment>
      <Breadcumb to="FAQ" what="FAQ" />
      <section className="page-wrapper">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="col-md-12 mt-40 text-left">
              <h2>1. Where can i see my Order Status?</h2>
              <p className="lead">
                Your order status will be shown in user dashboard section
              </p>
              <h2>2. What will be the shipping & delivery charges?</h2>
              <p className="lead">
                It will be free of cost for limited time period
              </p>
              <h2>3. Which payments are allowded?</h2>
              <p className="lead">
                Only razorpay, more payment options coming soon
              </p>
              <h2>4. What are returns & exchanges policies?</h2>
              <p className="lead">
                No return/exchange policy is considered, you can contact your
                isp for more information
              </p>
            </div>
          </div>
          <h3 className="text-center" style={{ marginTop: "100px" }}>
            Users can mail more questions, the frequent questions will be added
            here! <br />
            <br />
          </h3>
          <span>Email us to:</span>
          <h4>konarkdossiers@gmail.com</h4>
        </div>
      </section>
    </Fragment>
  );
};

export default Faq;
