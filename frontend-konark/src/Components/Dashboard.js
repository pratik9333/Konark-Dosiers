import React, { useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../api/Auth";
import { getUser } from "../api/User";

import Template from "../Components/Template";
import { AppContext } from "../Context/AppContext";
import { USER_INFO } from "../Context/action.types";
import { useAlert } from "react-alert";
import { checkPackExpiry } from "../api/Recharge";
import { Spinner } from "react-spinners-css";

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  let alert = useAlert();
  const [flag, setflag] = useState(false);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    //get user info
    checkPackExpiry(user._id, token)
      .then((data) => {
        console.log(data.success);
      })
      .catch((err) => {
        alert.error("Cannot able to fetch user data");
      });
    getUser(user._id, token)
      .then((data) => {
        if (!data.error) {
          setflag(true);
          dispatch({ type: USER_INFO, payload: data });
        } else {
          alert.error("Cannot able to fetch user data");
        }
      })
      .catch((err) => {
        alert.error("Cannot able to fetch user data");
      });
  }, []);

  return (
    <div className="dashboard-wrapper user-dashboard">
      <>
        <Template active="dashboard" />
        {state.user && flag ? (
          <div className="total-order mt-40">
            <h1 className="mb-20">Profile Information</h1>
            <hr />
            <div className="table-responsive mt-40">
              <table className="table">
                <thead>
                  <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Plan Activated ?</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style={{ color: "black" }}>
                  <tr>
                    <td>
                      <span>{state.user.firstname}</span>
                    </td>
                    <td>
                      <span>{state.user.lastname}</span>
                    </td>
                    <td>
                      <span>{state.user.email}</span>
                    </td>
                    <td>
                      <span>{state.user.phone}</span>
                    </td>
                    <td>{state.user.role}</td>
                    <td>
                      <span>
                        {state.user.activePack ? "Yes" : "No Plan activated"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <span style={{ display: "flex", justifyContent: "center" }}>
            <Spinner color="#000" size={50} />
          </span>
        )}
      </>
    </div>
  );
};

export default Dashboard;
