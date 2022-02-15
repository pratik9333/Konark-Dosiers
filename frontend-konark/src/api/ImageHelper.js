import React from "react";
import API from "../backend";
const Imagehelper = ({ product, where }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270";

  return (
    <div className="rounded border border-success p-2 text-center">
      <img
        src={imageurl}
        alt="photo"
        style={{
          maxHeight: where === "order" ? "120px" : "250px",
          maxWidth: where === "order" ? "200px" : "80%",
          minHeight: where === "order" ? "" : "250px",
        }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default Imagehelper;
