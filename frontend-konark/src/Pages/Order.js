import React, { useState, useContext, Fragment, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../api/Auth";
import Imagehelper from "../api/ImageHelper";
import { createOrder, payment } from "../api/Order";
import API from "../backend";
import Breadcumb from "../Components/Breadcumb";

import { AppContext } from "../Context/AppContext";

const Order = (props) => {
  const { products, packs } = useContext(AppContext);
  const { user } = isAuthenticated();

  let filteredPacks;
  let totalprice;

  let history = useHistory();

  let filteredProducts = products.filter(
    (product) => product.name === props.location.state.productName
  );

  if (props.location.state.rechargeName) {
    filteredPacks = packs.filter(
      (pack) => pack.packname === props.location.state.rechargeName
    );
    totalprice = filteredProducts[0].price + filteredPacks[0].packprice;
  }

  let imageproductsend = filteredProducts[0];

  totalprice = filteredProducts[0].price;

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

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // creating a new order
      let pay = await payment(order.amount * 100, userId, token);

      // Getting the order details back
      const { amount, id: order_id, currency } = pay;

      const options = {
        key: "rzp_test_pUm7R3AkjqGQ2Y", // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: user.firstname,
        order_id: order_id,
        handler: async function (response) {
          const datas = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          const res = await axios.post(
            `${API}/payment/success/${userId}`,
            datas
          );

          const createOrder = await axios.post(
            `${API}/order/create/${userId}`,
            {
              address: order.address,
              amount: order.amount,
              product: order.product,
              user: order.user,
              paymentId: res.data.paymentId,
              orderId: res.data.orderId,
              recharge: order.recharge,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (createOrder) {
            history.push("/confirmation");
          }
        },

        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Order Failed");
    }
  }

  useEffect(() => {
    window.scrollTo(1, 1);
  }, []);

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
                      onClick={displayRazorpay}
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
