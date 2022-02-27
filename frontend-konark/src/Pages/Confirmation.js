import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

const Confirmation = (props) => {
  useEffect(() => {
    window.scrollTo(1, 1);
  }, []);
  return (
    <section className="page-wrapper success-msg">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            {props.location.state && props.location.state.orderStatus ? (
              <div className="block text-center">
                <AiOutlineCheckCircle size="60px" color="green" />
                <h2 className="text-center">Thank you! For your payment</h2>
                <Link to="/" className="btn btn-main mt-20">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="block text-center">
                <AiOutlineCloseCircle size="60px" color="red" />
                <h2 className="text-center">
                  Sorry! Your order has been failed to place, your money will be
                  redunded in few minutes
                </h2>
                <Link to="/" className="btn btn-main mt-20">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
