import React, { Fragment, useEffect, useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { SliderJs } from "../Components/Slider";
import Loader from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getProducts } from "../api/Product";
import Imagehelper from "../api/ImageHelper";
import { isAuthenticated } from "../api/Auth";

import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadProducts = () => {
    //Getting Products
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
        saveProductLocalStorage(data);
      }
    });
  };

  const showToast = () => {
    if (!isAuthenticated()) {
      toast.error("Please Login to Buy!");
    } else {
      toast.success("Redirecting");
    }
  };

  const saveProductLocalStorage = (products) => {
    if (!localStorage.getItem("products")) {
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      const oldProducts = JSON.parse(localStorage.getItem("products"));
      const differentProducts = products.filter((product) => {
        return !oldProducts.some((productTwo) => {
          return (
            product.name == productTwo.name &&
            product.description == productTwo.description &&
            product.price == productTwo.price
          );
        });
      });
      if (differentProducts.length > 0) {
        localStorage.removeItem("products");
        localStorage.setItem("products", JSON.stringify(products));
      }
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Fragment>
      <ToastContainer />
      <SliderJs />
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
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

            {products.map((product) => (
              <>
                {product.name == "DEN SD" || product.name == "DEN HD" ? (
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

                        <button
                          type="button"
                          onClick={showToast}
                          class="btn btn-primary btn-sm mr-4 mb-2"
                          style={{ marginRight: "15px", marginBottom: "30px" }}
                        >
                          <i class="fas fa-shopping-cart pr-2"></i>Buy Now
                        </button>
                        <Link
                          to={{ pathname: "/productdetails", state: product }}
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
            ))}
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
            {products.map((product) => (
              <div
                class=" col-md-6 mb-5 mt-5 card"
                style={{ marginTop: "28px" }}
              >
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
                    <p
                      class="text-danger WebRupee mr-1"
                      style={{ fontSize: "20px" }}
                    >
                      <i class="fa fa-inr"></i>
                      Rs. {product.price}
                    </p>
                  </h6>

                  <button
                    type="button"
                    onClick={showToast}
                    class="btn btn-primary btn-sm mr-4 mb-2"
                    style={{ marginRight: "15px", marginBottom: "30px" }}
                  >
                    <i class="fas fa-shopping-cart pr-2"></i>Buy Now
                  </button>
                  <Link to={{ pathname: "/productdetails", state: product }}>
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
