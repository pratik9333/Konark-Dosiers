import React, { useState, useEffect, useContext } from "react";
import { isAuthenticated } from "../api/Auth";
import Template from "../Components/Template";
import { getUserOrders } from "../api/Order";
import { AppContext } from "../Context/AppContext";
import { ORDER_DETAILS } from "../Context/action.types";

const Orders = () => {
  const { user, token } = isAuthenticated();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (state.orderDetails && state.orderDetails.length === 0) {
      getUserOrders(user._id, token)
        .then((data) => {
          if (data.success) {
            dispatch({ type: ORDER_DETAILS, payload: data.orders });
          }
          if (!data.success) {
            dispatch({ type: ORDER_DETAILS, payload: null });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  console.log(state);

  return (
    <>
      <Template active="orders" />
      {state.orderDetails && state.orderDetails.length > 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="dashboard-wrapper user-dashboard">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.orderDetails.length !== 0 ? (
                        state.orderDetails.map((order) => (
                          <tr>
                            <td>{order.order_id}</td>
                            <td>{order.transaction_id}</td>
                            <td>{order.createdAt.split("T")[0]}</td>
                            <td>{order.product.length}</td>
                            <td>Rs. {order.amount}</td>
                            <td>
                              <span className="label label-primary">
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                className="btn btn-default"
                              >
                                View More Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <h2>Loading...</h2>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-center">No Orders found !</h2>
      )}
    </>
  );
};

export default Orders;
