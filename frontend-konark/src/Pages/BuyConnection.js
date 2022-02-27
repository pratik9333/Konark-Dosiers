import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Imagehelper from "../api/ImageHelper";
import Breadcumb from "../Components/Breadcumb";
import { useAlert } from "react-alert";

const BuyConnection = () => {
  const { state, dispatch } = useContext(AppContext);
  const [order, setOrder] = useState({
    productid: "",
    redirect: false,
  });
  const alert = useAlert();

  const { redirect } = order;

  const handleProduct = (id) => {
    if (state.user.activePack) {
      return alert.info("You already had connection!");
    }
    setOrder({ ...order, productid: id, redirect: true });
  };

  const performRedirect = () => {
    if (redirect) {
      return <Redirect to={{ pathname: "/order", state: order }} />;
    }
  };

  useEffect(() => {
    window.scrollTo(1, 1);
  }, []);

  return (
    <Fragment>
      <Breadcumb to="Buy Connection" what="Buy Connection" />
      <h1
        className="text-center"
        style={{ marginBottom: "90px", marginTop: "60px" }}
      >
        Select DTH Box
      </h1>
      <div className="container">
        <div className="row">
          {state.products.map((product) => (
            <>
              {product.rechargePlans.length > 0 ? (
                <div className="col-md-6">
                  <div class="card">
                    <Imagehelper product={product} />
                    <div class="card-body text-center">
                      <h5>{product.name}</h5>
                      <p class="small text-muted text-uppercase mb-2">
                        This product also included with
                        <span style={{ marginLeft: "2px" }}>
                          {product.rechargePlans[0].description}
                        </span>
                      </p>
                      <h6 class="mb-5" style={{ marginTop: "20px" }}>
                        <span
                          class="text-danger WebRupee mr-1"
                          style={{ fontSize: "20px" }}
                        >
                          DTH BOX Worth Rs. {product.price}
                        </span>
                      </h6>

                      <button
                        type="button"
                        onClick={() => handleProduct(product._id)}
                        class="btn btn-primary btn-sm mr-4 mb-2"
                        style={{
                          marginRight: "15px",
                          marginBottom: "30px",
                          marginTop: "10px",
                        }}
                      >
                        <i class="fas fa-shopping-cart pr-2"></i>Proceed
                      </button>
                      <Link
                        to={{
                          pathname: "/productdetails/" + 1,
                          state: product,
                        }}
                      >
                        <button
                          type="button"
                          class="btn btn-light btn-sm ml-1 mb-2"
                          style={{ marginBottom: "30px", marginTop: "10px" }}
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
