import React, { useEffect, useState, useContext } from "react";

import { isAuthenticated } from "../api/Auth";

import { getUser } from "../api/User";
import Template from "../Components/Template";
import { AppContext } from "../Context/AppContext";

const Dashboard = () => {
  const [User, setUser] = useState();
  const { user, token } = isAuthenticated();
  const { packs } = useContext(AppContext);

  let pack = undefined;
  let userInfo = undefined;

  useEffect(() => {
    getUser(user._id, token)
      .then((data) => {
        if (!data.error) {
          setUser(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (packs.length > 0 && User && User.activePack) {
    pack = packs.filter((pack) => pack._id === User.activePack.recharge);
    userInfo = {
      ...pack,
      ...User,
    };
  } else {
    userInfo = {
      ...User,
    };
  }

  return (
    <div class="dashboard-wrapper user-dashboard">
      {User ? (
        <>
          {" "}
          <Template active="dashboard" userInfo={userInfo ? userInfo : null} />
          <div class="total-order mt-40">
            <h1 className="mb-20">Profile Information</h1>
            <hr />
            <div class="table-responsive mt-40">
              <table class="table">
                <thead>
                  <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Orders</th>
                    <th>Active Plan</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style={{ color: "black" }}>
                  <tr>
                    <td>
                      <span>{user.firstname}</span>
                    </td>
                    <td>
                      <span>{user.lastname}</span>
                    </td>
                    <td>
                      <span>{user.email}</span>
                    </td>
                    <td>
                      <span>{user.phone}</span>
                    </td>
                    <td>
                      <span>{User.orders.length}</span>
                    </td>
                    <td>
                      <span>{pack ? pack[0].packname : "No Active Plan"}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
