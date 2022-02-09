import React, { useEffect, useState } from "react";
import { Fragment } from "react";

const Packs = (props) => {
  const [receivedPacks, setReceivedPacks] = useState([]);

  useEffect(() => {
    setReceivedPacks(props.location.state);
    window.scrollTo(1, 1);
  }, []);

  return (
    <Fragment>
      <div className="container">
        <h2 className="mb-5 pb-5 text-center" style={{ marginBottom: "40px" }}>
          Recharge Packs
        </h2>
        <div className="row">
          {receivedPacks.map((pack) => (
            <div className="col-md-4 col-sm-12 mt-5 offset-md-2 align-self-center">
              <div
                className="card border-secondary g-4"
                style={{
                  height: "24rem",
                  border: "2px solid #f2f2f2",
                  padding: "15px",
                  marginTop: "28px",
                  cursor: "pointer",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: "18px" }}>
                    {pack.packname}
                  </h5>
                  <h6 className="card-subtitle mb-4 mt-2">{pack.option}</h6>
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
                      {pack.validity}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Packs;
