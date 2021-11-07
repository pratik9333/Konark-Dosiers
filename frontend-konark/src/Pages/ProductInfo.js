import React, { Fragment, useEffect, useState } from "react";
import { isAuthenticated } from "../api/Auth";
import Imagehelper from "../api/ImageHelper";

import Breadcumb from "../Components/Breadcumb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductInfo = (props) => {
  const [Product, setProduct] = useState({});

  const showToast = () => {
    if (!isAuthenticated()) {
      toast.error("Please Login to Buy!");
    } else {
      toast.success("Redirecting");
    }
  };

  useEffect(() => {
    setProduct(props.location.state);
  }, []);
  return (
    <Fragment>
      <ToastContainer />
      <Breadcumb to="Product Details" what="Product Details" />
      <div className="row mt-50">
        <div className="col-md-5" style={{ marginTop: "80px" }}>
          <div className="single-product-slider">
            <Imagehelper product={Product} />
          </div>
        </div>
        <div className="col-md-7" style={{ fontSize: "15px" }}>
          <div className="single-product-details">
            <h2>{Product.name}</h2>
            <p
              className="product-price mt-20 text-danger"
              style={{ fontSize: "18px" }}
            >
              RS .{Product.price}
            </p>
            <p className="product-description mt-20"></p>
            <p>{Product.description}</p>
            <div className="product-quantity">
              <span>Quantity</span>
              {Product.stock}
            </div>
            <div className="product-category">
              <span>Category:</span>
              {Product.name}
            </div>
            <button
              type="button"
              onClick={showToast}
              className="btn btn-main mt-50"
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="col-xs-12 mt-50 p-5">
          <div className="tabCommon mt-50 p-5" style={{ padding: "20px" }}>
            <ul className="nav nav-tabs">
              <li className="active">
                <a data-toggle="tab" aria-expanded="true">
                  Details
                </a>
              </li>
            </ul>
            <div className="tab-content patternbg">
              <div id="details" className="tab-pane fade active in">
                <h3>Product Description</h3>
                <p>{Product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductInfo;
