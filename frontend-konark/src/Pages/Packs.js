import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useAlert } from "react-alert";
import { isAuthenticated } from "../api/Auth";
import { payment } from "../api/Order";
import { setNewPack } from "../api/Recharge";
import axios from "axios";
import API from "../backend";

const Packs = (props) => {
  const [receivedPacks, setReceivedPacks] = useState([]);

  let alert = useAlert();

  const { user, token } = isAuthenticated();

  useEffect(() => {
    console.log(props.location.state);
    setReceivedPacks(props.location.state.packs);
    window.scrollTo(1, 1);
  }, []);

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

  async function displayRazorpay(packprice, packid) {
    if (user.activePack && user.activePack.expiresAt !== null) {
      return alert.error("Your current pack is still active");
    }
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // creating a new order
      let pay = await payment(packprice * 100, user._id, token);

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

          setNewPack(user._id, token, packid)
            .then((data) => {
              if (data.error) {
                return alert.error(data.error);
              }
              alert.success(data.message);
            })
            .catch((err) => {
              console.log(err);
            });
        },

        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
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

  return (
    <Fragment>
      <div className="container">
        <h2 className="mb-5 pb-5 text-center" style={{ marginBottom: "40px" }}>
          Recharge Packs
        </h2>
        <div className="row">
          {props.location.state &&
            receivedPacks.map((pack) => (
              <div className="col-md-4 col-sm-12 mt-5 offset-md-2  text-center align-self-center">
                <div
                  className="card border-secondary g-4"
                  style={{
                    height: "24rem",
                    border:
                      pack._id == props.location.state.selectedPack._id
                        ? "none"
                        : "2px solid #f2f2f2",
                    padding: "15px",
                    marginTop: "28px",
                    cursor: "pointer",
                    boxShadow:
                      pack._id == props.location.state.selectedPack._id
                        ? "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"
                        : "none",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "18px" }}>
                      {pack.packname}
                    </h5>
                    <h6 className="card-subtitle  mb-4 mt-2">
                      Type - {pack.option}
                    </h6>
                    <p className="card-text" style={{ color: "#000" }}>
                      {pack.description}
                    </p>
                    <p className="card-text">
                      <span style={{ fontSize: "15px" }}>Price -</span>{" "}
                      <span style={{ fontWeight: "bold", color: "red" }}>
                        {pack.packprice} rupees
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "15px" }}>Validity -</span>{" "}
                      <span className="text-info font-weight-bold">
                        {pack.validityMonth} Month
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    displayRazorpay(pack.packprice, pack._id);
                  }}
                  className="btn mt-20 btn-primary"
                >
                  Activate Pack
                </button>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Packs;
