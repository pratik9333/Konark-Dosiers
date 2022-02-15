import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, useHistory, Redirect } from "react-router-dom";
import { isAuthenticated } from "../api/Auth";
import Imagehelper from "../api/ImageHelper";
import { payment } from "../api/Order";
import API from "../backend";
import Breadcumb from "../Components/Breadcumb";
import { ToastContainer, toast } from "react-toastify";
import { getProduct } from "../api/Product";

const Order = (props) => {
  const { user } = isAuthenticated();
  const [Product, setProduct] = useState();
  const [flag, setflag] = useState(true);

  let history = useHistory();

  useEffect(() => {
    if (!props.location.state) {
      return history.push("/");
    }
    getProduct(props.location.state.productid)
      .then((data) => {
        if (data.error) {
          return console.log(data.error);
        }
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
    window.scrollTo(1, 1);
  }, []);

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
    amount: null,
    paymentId: "",
    orderId: "",
    product: [],
    user: userId,
    recharge: null,
  });

  if (Product && flag) {
    setOrderInfo({
      ...order,
      amount: Product.rechargePlans[0].packprice + Product.price,
      product: [Product._id],
      recharge:
        Product.rechargePlans.length > 0 ? Product.rechargePlans[0]._id : null,
    });
    setflag(!flag);
  }

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
      if (
        order.address.fulladdress === "" ||
        order.address.zipcode === "" ||
        order.address.city === "" ||
        order.address.Country === ""
      ) {
        return toast.error("Please fill in all the fields");
      }
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
        key: "rzp_test_eSOOkkKjgukkFz", // Enter the Key ID generated from the Dashboard
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

  return (
    <div>
      {Product ? (
        <div className="page-wrapper">
          <ToastContainer />
          <Breadcumb what="Checkout" to="Checkout" />
          <div className="checkout shopping">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="product-checkout-details">
                    <div className="block">
                      <h4 className="widget-title">Order Summary</h4>
                      <div className="media product-card">
                        <Link
                          className="pull-left"
                          to={{
                            pathname: "/productdetails",
                            state: Product,
                          }}
                        >
                          <Imagehelper where="order" product={Product} />
                        </Link>
                        <div className="media-body">
                          <h4
                            className="media-heading"
                            style={{ fontSize: "23px", color: "#000" }}
                          ></h4>
                          <p
                            className="product"
                            style={{ fontSize: "13px", marginTop: "10px" }}
                          >
                            Enjoy Using {Product.description}{" "}
                            <span style={{ fontWeight: "bold" }}>
                              and included your choosen recharge pack{" "}
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
                          <span>RS. {Product.rechargePlans[0].packprice}</span>
                        </li>
                        <li>
                          <span>DTH BOX Price:</span>
                          <span>RS. {Product.price}</span>
                        </li>
                        <li>
                          <span>Subtotal:</span>
                          <span className="price">
                            RS{" "}
                            {Product.rechargePlans[0].packprice + Product.price}
                          </span>
                        </li>
                      </ul>
                      <div className="summary-total">
                        <span>Total</span>
                        <span>
                          RS.{" "}
                          {Product.rechargePlans[0].packprice + Product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div
                    className="block billing-details"
                    style={{ width: "99%" }}
                  >
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
                          required
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Order;
