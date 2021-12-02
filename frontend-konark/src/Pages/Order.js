import React, { useState, useContext, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../api/Auth";
import Imagehelper from "../api/ImageHelper";
import { createOrder } from "../api/Order";
import {} from "../api/paymentBhelper";
import Breadcumb from "../Components/Breadcumb";

import { AppContext } from "../Context/AppContext";

const Order = (props) => {
  const { products, packs } = useContext(AppContext);

  let filteredProducts = products.filter(
    (product) => product.name === props.location.state.productName
  );
  let filteredPacks = packs.filter(
    (pack) => pack.packname === props.location.state.rechargeName
  );

  let imageproductsend = filteredProducts[0];
  const totalprice = filteredProducts[0].price + filteredPacks[0].packprice;

  //Authentication
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const [order, setOrderInfo] = useState({
    address: {
      fulladdress: "",
      zipcode: "",
      city: "",
      Country: "",
    },
    amount: totalprice,
    product: filteredProducts[0]._id,
    user: userId,
    recharge: filteredPacks[0]._id,
  });

  const handleOrder = (e) => {
    setOrderInfo({
      ...order,
      address: { ...order.address, [e.target.name]: e.target.value },
    });
  };

  const submitOrder = (event) => {
    event.preventDefault();
    createOrder(userId, token, order).then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        console.log(data);
        setOrderInfo({
          ...order,
          address: {
            ...order.address,
            fulladdress: "",
            zipcode,
            city: "",
            zipcode: "",
            amount: "",
            product: "",
            recharge: "",
          },
        });
      }
    });
  };

  // const displayRazorpay = () => {
  //   const options = {
  //     key: process.env.key_id,
  //     currency: "inr",
  //     amount: ,
  //     order_id: ,
  //     name: "Konark Dossiers",
  //     description: "Buy new connection by paying the amount",
  //     handler: function (response) {
  //       alert(response.razorpay_payment_id);
  //       alert(response.razorpay_order_id);
  //       alert(response.razorpay_signature);
  //     },
  //   };
  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // };

  return (
    <Fragment>
      <Breadcumb what="Checkout" to="Checkout" />
      <div className="page-wrapper">
        <div className="checkout shopping">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="block billing-details" style={{ width: "99%" }}>
                  <h4 className="widget-title">Billing Details</h4>
                  <form className="checkout-form">
                    <div className="form-group">
                      <label for="user_address">Enter Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fulladdress"
                        value={order.address.fulladdress || ""}
                        onChange={handleOrder}
                        placeholder=""
                      />
                    </div>
                    <div className="checkout-country-code clearfix">
                      <div className="form-group">
                        <label for="user_post_code">Zip Code</label>
                        <input
                          type="text"
                          name="zipcode"
                          className="form-control"
                          value={order.address.zipcode || ""}
                          onChange={handleOrder}
                        />
                      </div>
                      <div className="form-group">
                        <label for="user_city">City</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control"
                          value={order.address.city || ""}
                          onChange={handleOrder}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="user_country">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Country"
                        value={order.address.Country || ""}
                        onChange={handleOrder}
                      />
                    </div>
                    <button
                      onClick={submitOrder}
                      type="button"
                      className="btn btn-dark"
                    >
                      Submit Details
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-md-5">
                <div className="product-checkout-details">
                  <div className="block">
                    <h4 className="widget-title">Order Summary</h4>
                    <div className="media product-card">
                      <Link
                        className="pull-left"
                        to={{
                          pathname: "/productdetails",
                          state: imageproductsend,
                        }}
                      >
                        <Imagehelper where="order" product={imageproductsend} />
                      </Link>
                      <div className="media-body">
                        <h4
                          className="media-heading"
                          style={{ fontSize: "23px", color: "#000" }}
                        >
                          <span>{imageproductsend.name}</span>
                        </h4>
                        <p
                          className="product"
                          style={{ fontSize: "13px", marginTop: "10px" }}
                        >
                          {imageproductsend.description} and included your
                          choosen recharge pack{" "}
                          <span style={{ fontWeight: "bold", color: "black" }}>
                            {filteredPacks[0].packname}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="discount-code">
                      <p className="mb-40" style={{ marginBottom: "10px" }}>
                        Have a discount ?{" "}
                      </p>
                      <form>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Coupon Code"
                          />
                        </div>
                        <button type="button" className="btn btn-primary">
                          Apply Coupon
                        </button>
                      </form>
                    </div>
                    <ul className="summary-prices">
                      <li>
                        <span>Shipping:</span>
                        <span>Free</span>
                      </li>
                      <li>
                        <span>Recharge Pack Price:</span>
                        <span>RS. {filteredPacks[0].packprice}</span>
                      </li>
                      <li>
                        <span>DTH BOX Price:</span>
                        <span>RS. {filteredProducts[0].price}</span>
                      </li>
                      <li>
                        <span>Subtotal:</span>
                        <span className="price">RS {totalprice}</span>
                      </li>
                    </ul>
                    <div className="summary-total">
                      <span>Total</span>
                      <span>RS. {totalprice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Order;
