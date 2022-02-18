import React from "react";
import API from "../backend";
const Imagehelper = ({ product, where }) => {
  const imageurl =
    where === "order"
      ? `${API}/product/photo/${product.product}`
      : `${API}/product/photo/${product._id}`;

  return (
    <div className="rounded border border-success p-2 text-center">
      <img
        src={imageurl}
        alt="photo"
        style={{
          maxHeight:
            where === "order" || where === "difforder" ? "190px" : "250px",
          maxWidth:
            where === "order" || where === "difforder" ? "200px" : "80%",
          minHeight:
            where === "order" || where === "difforder" ? "130px" : "250px",
          minWidth: where === "order" || where === "difforder" ? "130px" : "",
        }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default Imagehelper;
