import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../api/Auth";
import Imagehelper from "../api/ImageHelper";
import { payment } from "../api/Order";

import API from "../backend";
import Breadcumb from "../Components/Breadcumb";
import { useAlert } from "react-alert";
import { AppContext } from "../Context/AppContext";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { deleteCartItem, updateCartItem } from "../api/cart";
import { ADD_CART, LOADING, ORDER_DETAILS } from "../Context/action.types";

const Order = (props) => {
  const { user, token } = isAuthenticated();
  const [flag, setflag] = useState(true);
  const [loading, setloading] = useState(false);
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
    user: user._id,
    recharge: null,
  });

  const { state, dispatch, setCartItems } = useContext(AppContext);

  let alert = useAlert();
  let history = useHistory();
  let newConnectionProd = [];
  const cartProducts = [];

  useEffect(() => {
    if (state.user.newUser && state.orderDetails.length == 1) {
      setTimeout(() => {
        history.push("/");
      }, 100);
      return alert.info(
        "Cannot purchase products before your first connection set up!"
      );
    }

    if (state.cart && Object.keys(state.cart).length === 0) {
      setCartItems();
    }
    window.scrollTo(1, 1);
  }, []);

  if (state.products && props.location.state) {
    for (let prod of state.products) {
      if (prod._id === props.location.state.productid) {
        newConnectionProd.push(prod);
      }
    }
  }

  if (!state.user.newUser && state.cart && state.cart.products) {
    if (state.cart.products.length > 0) {
      for (let cartItem of state.cart.products) {
        cartProducts.push({
          product: cartItem.product,
          quantity: cartItem.quantity,
          amount: cartItem.totalPrice,
        });
      }
    }
  }

  if (newConnectionProd.length > 0 && flag) {
    setOrderInfo({
      ...order,
      amount:
        newConnectionProd[0].rechargePlans[0].packprice +
        newConnectionProd[0].price,
      product: [
        {
          product: newConnectionProd[0]._id,
          quantity: 1,
          amount: newConnectionProd[0].price,
        },
      ],
      recharge:
        newConnectionProd[0].rechargePlans.length > 0
          ? newConnectionProd[0].rechargePlans[0]._id
          : null,
    });
    setflag(!flag);
  }

  const handleOrder = (e) => {
    setOrderInfo({
      ...order,
      address: { ...order.address, [e.target.name]: e.target.value },
    });
  };

  const removeCartItem = (id) => {
    setloading(!loading);
    deleteCartItem(user._id, id, token)
      .then((data) => {
        setloading(false);
        if (data.error) {
          return alert.error("Product cannot be removed");
        }
        if (data.message === "Cart Empty") {
          dispatch({ type: ADD_CART, payload: null });
          return alert.success("Cart is empty");
        }
        dispatch({ type: ADD_CART, payload: data.cart });
        alert.success("Product was removed from cart");
      })
      .catch((data) => {
        setloading(false);
        return alert.error("Product cannot be removed");
      });
  };

  const updateCart = (action, data) => {
    if (action === "incr") {
      setloading(!loading);
      updateCartItem(user._id, data, token, { incr: true, decr: false })
        .then((data) => {
          setloading(false);
          if (data.error) {
            return alert.error("Product cannot be updated");
          }
          dispatch({ type: ADD_CART, payload: data.cart });
        })
        .catch((data) => {
          setloading(false);
          return alert.error("Product cannot be updated");
        });
    } else {
      setloading(!loading);
      updateCartItem(user._id, data, token, { incr: false, decr: true })
        .then((data) => {
          setloading(false);
          if (data.message === "Quantity cannot be decreased") {
            return alert.error("Product cannot be updated");
          }
          dispatch({ type: ADD_CART, payload: data.cart });
        })
        .catch((data) => {
          setloading(false);
          return alert.error("Product cannot be updated");
        });
    }
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
        return alert.error("Please fill in all the fields");
      }

      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // creating a new order
      let pay = await payment(
        state.cart ? state.cart.cartTotal * 100 : order.amount * 100,
        user._id,
        token
      );

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
            `${API}/payment/success/${user._id}`,
            datas
          );

          dispatch({ type: LOADING, payload: true });

          axios
            .post(
              `${API}/order/create/${user._id}`,
              {
                address: order.address,
                amount: state.cart ? state.cart.cartTotal : order.amount,
                product: state.cart ? cartProducts : order.product,
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
            )
            .then((response) => {
              dispatch({
                type: ORDER_DETAILS,
                payload: response.data.orders,
              });
              dispatch({ type: ADD_CART, payload: null });
              history.push({
                pathname: "/confirmation",
                state: { orderStatus: true },
              });
              dispatch({ type: LOADING, payload: false });
            })
            .catch((error) => {
              history.push({
                pathname: "/confirmation",
                state: { orderStatus: false },
              });
              dispatch({ type: LOADING, payload: false });
              return alert.error(
                "Order failed, money will be refunded in few minutes"
              );
            });
        },

        prefill: {
          name: state.user.name,
          email: state.user.email,
          contact: state.user.phone,
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
      alert.error("Order Failed");
    }
  }

  const fadePage = {
    opacity: "0.8",
  };
  const unFadePage = {
    opacity: "1",
  };

  return (
    <div>
      {newConnectionProd.length > 0 ||
      (state.cart !== null && state.cart.products) ? (
        <div className="page-wrapper" style={loading ? fadePage : unFadePage}>
          <Breadcumb what="Checkout" to="Checkout" />
          <div className="checkout shopping">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="product-checkout-details">
                    <div className="block">
                      <h4 className="widget-title">
                        {state.cart !== null ? "Cart Items" : "Product Details"}
                      </h4>
                      {state.user.newUser ? (
                        <div
                          className="media product-card d-flex align-items-baseline"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Link
                            className="pull-left"
                            to={{
                              pathname: "/productdetails",
                              state: newConnectionProd[0],
                            }}
                          >
                            <Imagehelper
                              where="difforder"
                              product={newConnectionProd[0]}
                            />
                          </Link>
                          <div className="media-body">
                            <h4
                              className="media-heading"
                              style={{ fontSize: "23px", color: "#000" }}
                            ></h4>
                            <p
                              className="product"
                              style={{
                                fontSize: "16px",
                                marginTop: "10px",
                                color: "black",
                              }}
                            >
                              Enjoy Using {newConnectionProd[0].name}{" "}
                              <span style={{ fontWeight: "bold" }}>
                                with included your choosen recharge pack{" "}
                              </span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="row text-center">
                          <div
                            className="col-md-3"
                            style={{ fontSize: "20px", fontWeight: "normal" }}
                          >
                            Product Details
                          </div>
                          <div
                            className="col-md-3"
                            style={{ fontSize: "20px", fontWeight: "normal" }}
                          >
                            Quantity
                          </div>
                          <div
                            className="col-md-3"
                            style={{ fontSize: "20px", fontWeight: "normal" }}
                          >
                            Price
                          </div>
                          <div
                            className="col-md-3"
                            style={{ fontSize: "20px", fontWeight: "normal" }}
                          >
                            Total Price
                          </div>
                        </div>
                      )}
                      {state.user.newUser === false && state.cart.products
                        ? state.cart.products.map((prod) => (
                            <>
                              <div
                                className="row text-center"
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  alignItems: "center",
                                  marginTop: "30px",
                                }}
                              >
                                <div className="col-md-3">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <Imagehelper product={prod} where="order" />
                                    <h4
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {prod.name}
                                    </h4>
                                  </div>
                                  <p
                                    style={{
                                      display: "block",
                                      color: "red",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      removeCartItem(prod.product);
                                    }}
                                  >
                                    remove
                                  </p>
                                </div>
                                <div className="col-md-3">
                                  <span
                                    style={{
                                      fontSize: "17px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span
                                      className="pr-40"
                                      onClick={() => {
                                        updateCart("incr", prod.product);
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <AiOutlinePlusCircle size="23px" />
                                    </span>
                                    <span
                                      className="prod-quantity"
                                      style={{
                                        marginRight: "10px",
                                        marginLeft: "10px",
                                        fontSize: "18px",
                                        color: "black",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {prod.quantity}
                                    </span>
                                    <span
                                      onClick={() => {
                                        updateCart("decr", prod.product);
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <AiOutlineMinusCircle size="23px" />
                                    </span>
                                  </span>
                                </div>
                                <div className="col-md-3">
                                  <span>
                                    <BiRupee /> &nbsp;
                                    <span
                                      style={{
                                        fontSize: "17px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {prod.price}
                                    </span>
                                  </span>
                                </div>
                                <div className="col-md-3">
                                  <span>
                                    <BiRupee /> &nbsp;
                                    <span
                                      style={{
                                        fontSize: "17px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {prod.totalPrice}
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <hr className="hero" />
                            </>
                          ))
                        : ""}

                      <h4 className="mt-40 mb-40 pb-40">Order Summary</h4>

                      <div className="discount-code mt-40">
                        <p
                          className="mb-40 mt-40"
                          style={{ marginBottom: "10px", marginTop: "10px " }}
                        >
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
                        {state.user && state.user.newUser ? (
                          <>
                            <li>
                              <span>Recharge Pack Price:</span>
                              <span>
                                RS.{" "}
                                {
                                  newConnectionProd[0].rechargePlans[0]
                                    .packprice
                                }
                              </span>
                            </li>
                            <li>
                              <span>DTH BOX Price:</span>
                              <span>RS. {newConnectionProd[0].price}</span>
                            </li>{" "}
                            <li>
                              <span>Subtotal:</span>
                              <span className="price">RS {order.amount}</span>
                            </li>
                          </>
                        ) : (
                          ""
                        )}
                      </ul>
                      <div className="summary-total">
                        <span>Total</span>
                        <span>
                          RS.
                          {state.user && state.user.newUser
                            ? order.amount
                            : state.cart.cartTotal}
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
                        onClick={() => {
                          displayRazorpay();
                        }}
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
        <h1 className="text-center mt-40" style={{ marginTop: "100px" }}>
          User cart is empty !
        </h1>
      )}
    </div>
  );
};

export default Order;
