import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import Template from "../Components/Template";

const Address = () => {
  let location = useLocation();

  return (
    <>
      {location.state ? (
        <>
          <Template
            active="address"
            userInfo={location.state ? location.state : null}
          />
          {location.state.activePack ? (
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Pack Name</th>
                    <th>Pack Price</th>
                    <th>Validity Month</th>
                    <th>Pack Expiry Date</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{location.state[0].packname}</td>
                    <td>Rs. {location.state[0].packprice}</td>
                    <td>{location.state[0].validityMonth} Month</td>
                    <td>{location.state.activePack.expiresAt}</td>
                    <td>{location.state[0].option}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="text-center mt-40">
              User has no active plan, <br /> recharge your account or buy new
              connection !
            </h2>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Address;
