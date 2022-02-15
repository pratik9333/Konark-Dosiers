import React, { useContext, useEffect } from "react";
import { isAuthenticated } from "../api/Auth";
import { getUser } from "../api/User";

import Template from "../Components/Template";
import { AppContext } from "../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import { USER_INFO } from "../Context/action.types";

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    //get user info
    getUser(user._id, token)
      .then((data) => {
        if (!data.error) {
          dispatch({ type: USER_INFO, payload: data });
        } else {
          toast.error("Cannot able to fetch user data");
        }
      })
      .catch((err) => {
        toast.error("Cannot able to fetch user data");
      });
  }, []);

  return (
    <div class="dashboard-wrapper user-dashboard">
      {state.user && state.user.orders ? (
        <>
          <ToastContainer />
          <Template active="dashboard" />
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
                    <td>
                      <span>
                        {state.user.orders.length <= 0
                          ? "No Orders"
                          : state.user.orders.length}
                      </span>
                    </td>
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
        </>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};

export default Dashboard;
