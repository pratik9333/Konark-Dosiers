import React, { Fragment, useEffect, useState, useContext } from "react";
import { isAuthenticated } from "../api/Auth";
import Imagehelper from "../api/ImageHelper";
import { useAlert } from "react-alert";

import Breadcumb from "../Components/Breadcumb";

import { useHistory } from "react-router";
import { AppContext } from "../Context/AppContext";
import { addCart } from "../api/cart";
import { ADD_CART } from "../Context/action.types";

const ProductInfo = (props) => {
  const [Product, setProduct] = useState({});
  const { state, dispatch } = useContext(AppContext);
  const alert = useAlert();
  const { user, token } = isAuthenticated();

  const showToast = (data) => {
    if (!isAuthenticated()) {
      alert.error("Please Login to Buy!");
    } else {
      if (data === "new") {
        return history.push("/newconnection");
      }
      if (state.user.newUser && state.user.activePack) {
        return alert.info(
          "Cannot purchase products before your first connection set up!"
        );
      }
      if (state.user.newUser) {
        return alert.info(
          "Cannot purchase items before having new connection!"
        );
      }
      if (state.user.newUser === false) {
        addCart(user._id, data, token)
          .then((data) => {
            if (data.error) {
              return alert.show(data.error);
            }
            alert.success("Product added to cart");
            dispatch({ type: ADD_CART, payload: data.cart });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  let history = useHistory();

  useEffect(() => {
    setProduct(props.location.state);
    window.scrollTo(1, 1);
  }, []);

  return (
    <Fragment>
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
            {props.match.params.id == 2 ? (
              <button
                type="button"
                onClick={() => {
                  showToast(Product._id);
                }}
                className="btn btn-main mt-50"
              >
                Add to cart
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  showToast("new");
                }}
                className="btn btn-main mt-50"
              >
                Buy New Connection
              </button>
            )}
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
