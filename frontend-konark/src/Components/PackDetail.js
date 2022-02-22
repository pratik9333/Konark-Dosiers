import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";

import Template from "./Template";
import { AppContext } from "../Context/AppContext";

const PackDetail = () => {
  const { state } = useContext(AppContext);
  let userPack;
  let history = useHistory();

  useEffect(() => {
    if (Object.keys(state.user).length === 0) {
      history.push("/userdashboard");
    }
  }, []);

  if (state.user.activePack && state.user.activePack.expiresAt !== null) {
    console.log(1);
    userPack = state.packs.filter(
      (pack) => pack._id == state.user.activePack.recharge
    );
  } else {
    userPack = undefined;
  }

  console.log(userPack);
  return (
    <>
      {state.user ? (
        <>
          <Template active="address" />
          {userPack ? (
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
                    <td>{userPack[0].packname}</td>
                    <td>Rs. {userPack[0].packprice}</td>
                    <td>{userPack[0].validityMonth} Month</td>
                    <td>{state.user.activePack.expiresAt}</td>
                    <td>{userPack[0].option}</td>
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
        <h2 className="text-center mt-40">Loading...</h2>
      )}
    </>
  );
};

export default PackDetail;
