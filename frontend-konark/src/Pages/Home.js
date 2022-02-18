import React, { Fragment, useEffect, useContext } from "react";
import Imagehelper from "../api/ImageHelper";

import { AppContext } from "../Context/AppContext";
import { SliderJs } from "../Components/Slider";

import { isAuthenticated } from "../api/Auth";
import { Link, useHistory } from "react-router-dom";
import { addCart } from "../api/cart";
import { useAlert } from "react-alert";
import { ADD_CART } from "../Context/action.types";
import { TailSpin } from "react-loader-spinner";
const Home = () => {
  const { state, dispatch } = useContext(AppContext);
  const { user, token } = isAuthenticated();

  let history = useHistory();
  const alert = useAlert();

  console.log(state.cart);

  const showToast = (data) => {
    if (!isAuthenticated()) {
      alert.error("Please Login to Buy!");
    } else {
      if (data === "new") {
        return history.push("/newconnection");
      }
      if (state.user.newUser && state.user.orders.length === 1) {
        return alert.info(
          "Cannot purchase products before your first connection set up!"
        );
      }
      if (state.user.newUser) {
        return alert.error(
          "Cannot purchase items before having new connection!"
        );
      }
      if (!state.user.newUser && state.user.orders.length === 1) {
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

  useEffect(() => {
    //setCartItems();
    window.scrollTo(1, 1);
  }, []);

  return (
    <Fragment>
      <SliderJs />
      <section className="product-category section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div
                className="title text-center mb-5"
                style={{ marginBottom: "50px" }}
              >
                <h1>DTH Box Category</h1>
              </div>
            </div>

            {state.products.length > 0 ? (
              state.products.map((product) => (
                <>
                  {product.rechargePlans.length > 0 ? (
                    <div className="col-md-6">
                      <div class="card">
                        <div class="view zoom overlay">
                          <a href="#!">
                            <div class="mask">
                              <Imagehelper product={product} />
                              <div class="mask rgba-black-slight"></div>
                            </div>
                          </a>
                        </div>

                        <div class="card-body text-center">
                          <h5>{product.name}</h5>
                          <p class="small text-muted text-uppercase mb-2">
                            {product.description}
                          </p>
                          <h6 class="mb-3">
                            <span
                              class="text-danger WebRupee mr-1"
                              style={{ fontSize: "20px" }}
                            >
                              Rs. {product.price}
                            </span>
                          </h6>
                          <Link
                            to={{
                              pathname: "/newconnection",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                showToast("new");
                              }}
                              class="btn btn-primary btn-sm mr-4 mb-2"
                              style={{
                                marginRight: "15px",
                                marginBottom: "30px",
                              }}
                            >
                              <i class="fas fa-shopping-cart pr-2"></i>Buy New
                              Connection
                            </button>
                          </Link>
                          <Link
                            to={{
                              pathname: "/productdetails/" + 1,
                              state: product,
                            }}
                          >
                            <button
                              type="button"
                              class="btn btn-light btn-sm ml-1 mb-2"
                              style={{ marginBottom: "30px" }}
                            >
                              <i class="fas fa-info-circle pr-2"></i>Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ))
            ) : (
              <div>
                <div class="spinner">Loading</div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="products section bg-gray">
        <div className="container">
          <div className="row">
            <div className="title text-center">
              <h1>Products</h1>
            </div>
          </div>
          <div className="row">
            {state.products.map((product) => (
              <>
                {product.rechargePlans.length === 0 ? (
                  <div
                    class=" col-md-6 mb-5 mt-5 g-5"
                    style={{ marginTop: "50px" }}
                  >
                    <div class="view zoom overlay">
                      <a href="#!">
                        <div class="mask">
                          <Imagehelper product={product} />
                          <div class="mask rgba-black-slight mb-5"></div>
                        </div>
                      </a>
                    </div>

                    <div
                      class="card-body text-center"
                      style={{ marginTop: "30px" }}
                    >
                      <h5 className="mt-5">{product.name}</h5>
                      <h6 class="mb-3">
                        <p
                          class="text-danger WebRupee mt-5 mr-1"
                          style={{ fontSize: "20px", marginBottom: "20px" }}
                        >
                          <i class="fa fa-inr mt-5"></i>
                          Rs. {product.price}
                        </p>
                      </h6>

                      <button
                        type="button"
                        onClick={() => {
                          showToast(product._id);
                        }}
                        class="btn btn-primary btn-sm mr-4 mb-2"
                        style={{
                          marginRight: "15px",
                          marginBottom: "30px",
                        }}
                      >
                        <i class="fas fa-shopping-cart pr-2"></i>Add To Cart
                      </button>
                      <Link
                        to={{
                          pathname: "/productdetails/" + 2,
                          state: product,
                        }}
                      >
                        <button
                          type="button"
                          class="btn btn-light btn-sm ml-1 mb-2"
                          style={{ marginBottom: "30px" }}
                        >
                          <i class="fas fa-info-circle pr-2"></i>Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        </div>
      </section>
      <section className="call-to-action bg-gray section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="title">
                <h2 className="text-dark">SUBSCRIBE TO US</h2>
              </div>
              <div className="col-lg-6 col-md-offset-3">
                <div className="input-group subscription-form">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Email Address"
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-main" type="button">
                      Subscribe Now!
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
