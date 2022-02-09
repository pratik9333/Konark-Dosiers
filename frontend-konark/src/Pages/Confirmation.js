import React from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <section className="page-wrapper success-msg">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="block text-center">
              <i className="tf-ion-android-checkmark-circle"></i>
              <h2 className="text-center">Thank you! For your payment</h2>
              <Link to="/" className="btn btn-main mt-20">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
