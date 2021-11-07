import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Imagehelper from "../api/ImageHelper";
import Breadcumb from "../Components/Breadcumb";

const BuyConnection = () => {
  const [products, setProducts] = useState([]);
  const [packs, setPacks] = useState([]);
  const [order, setOrder] = useState({
    rechargeName: "",
    productName: "",
    redirect: false,
  });

  const { redirect, rechargeName } = order;

  //Returns array with SD Channels
  let sdChannels = packs.filter((pack) => !pack.packname.includes("HD"));

  //Returns Array with HD Channels
  let hdChannels = packs.filter((pack) => !pack.packname.includes("SD"));

  const handleProduct = (product) => {
    if (rechargeName == "") {
      toast.error("Select Recharge Pack");
    } else {
      setOrder({ ...order, productName: product.name, redirect: true });
    }
  };

  const handleRecharge = (e) => {
    if (e.target.value != "select pack") {
      setOrder({ ...order, rechargeName: e.target.value });
    }
  };

  const performRedirect = () => {
    if (redirect) {
      return (
        <Redirect to={{ pathname: "newconnection/order", state: order }} />
      );
    }
  };

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")));
    setPacks(JSON.parse(localStorage.getItem("packs")));
  }, []);
  return (
    <Fragment>
      <ToastContainer />
      <Breadcumb to="Buy Connection" what="Buy Connection" />
      <h1
        className="text-center"
        style={{ marginBottom: "90px", marginTop: "60px" }}
      >
        Select DTH Box and Recharge Pack
      </h1>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <>
              {product.name == "DEN SD" ? (
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
                      <select
                        onChange={handleRecharge}
                        className="form-control"
                        style={{ marginBottom: "25px", marginTop: "30px" }}
                      >
                        <option value="select pack">Select Pack</option>
                        {sdChannels.map((pack) => (
                          <option value={pack.name}>{pack.packname}</option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => handleProduct(product)}
                        class="btn btn-primary btn-sm mr-4 mb-2"
                        style={{ marginRight: "15px", marginBottom: "30px" }}
                      >
                        <i class="fas fa-shopping-cart pr-2"></i>Proceed
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

          {products.map((product) => (
            <>
              {product.name == "DEN HD" ? (
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
                      <select
                        onChange={handleRecharge}
                        className="form-control mb-40"
                        style={{ marginBottom: "25px", marginTop: "30px" }}
                      >
                        <option value="select pack">Select Pack</option>
                        {hdChannels.map((pack) => (
                          <option value={pack.name}>{pack.packname}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          handleProduct(product);
                        }}
                        class="btn btn-primary btn-sm mr-4 mb-2"
                        style={{ marginRight: "15px", marginBottom: "30px" }}
                      >
                        <i class="fas fa-shopping-cart pr-2"></i>Proceed
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
      {performRedirect()}
    </Fragment>
  );
};

export default BuyConnection;
