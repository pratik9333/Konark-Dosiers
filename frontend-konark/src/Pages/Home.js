import React, { Fragment } from "react";
import { SliderJs } from "../Components/Slider";

const Home = () => {
  return (
    <Fragment>
      <SliderJs />
      <section className="product-category section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title text-center">
                <h2>DTH Box Category</h2>
              </div>
            </div>
            <div className="col-md-6">
              <div className="category-box">
                <a href="#!">
                  <div className="content">
                    <h3>Set Up Box</h3>
                    <p></p>
                  </div>
                </a>
              </div>
              <div className="category-box">
                <a href="#!">
                  <div className="content">
                    <h3>Unknow</h3>
                    <p></p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="category-box category-box-2">
                <a href="#!">
                  <div className="content">
                    <h3>Unknown</h3>
                    <p></p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="products section bg-gray">
        <div className="container">
          <div className="row">
            <div className="title text-center">
              <h2>Products</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="product-item">
                <div className="product-thumb">
                  <img className="img-responsive" src="" alt="product-img" />
                  <div className="preview-meta">
                    <ul>
                      <li>
                        <span data-toggle="modal" data-target="#product-modal">
                          <i className="tf-ion-ios-search-strong"></i>
                        </span>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="tf-ion-ios-heart"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="tf-ion-android-cart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-content">
                  <h4>
                    <a href="">Unknown</a>
                  </h4>
                  <p className="price">?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="call-to-action bg-gray section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="title">
                <h2 className="text-dark">SUBSCRIBE TO US</h2>
                <p>Blah</p>
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
