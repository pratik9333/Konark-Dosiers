import React, { useEffect, useContext, useState } from "react";
import { isAuthenticated } from "../api/Auth";
import Template from "../Components/Template";
import { getUserOrders } from "../api/Order";
import { AppContext } from "../Context/AppContext";
import { ORDER_DETAILS } from "../Context/action.types";
import API from "../backend";
import { Spinner } from "react-spinners-css";

const Orders = () => {
  const { user, token } = isAuthenticated();

  const { state, dispatch } = useContext(AppContext);
  const [flag, setflag] = useState(true);

  useEffect(() => {
    getUserOrders(user._id, token)
      .then((data) => {
        if (data.success) {
          setflag(true);
          dispatch({ type: ORDER_DETAILS, payload: data.orders });
        }
        if (!data.success) {
          setflag(!flag);
          dispatch({ type: ORDER_DETAILS, payload: null });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Template active="orders" />
      {!flag ? (
        <h2 className="text-center">No Orders Found!</h2>
      ) : state.orderDetails.length !== 0 ? (
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
                      {state.orderDetails.map((order) => (
                        <tr key={order._id}>
                          <td>{order.order_id}</td>
                          <td>{order.transaction_id}</td>
                          <td>{order.createdAt.split("T")[0]}</td>
                          <td>{order.products.length}</td>
                          <td>Rs. {order.amount}</td>
                          <td>
                            <span
                              key={order._id}
                              className="label label-primary"
                            >
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              className="btn btn-default"
                              onClick={() => {
                                window.open(
                                  `${API}/order/view/${order._id}`,
                                  "_blank"
                                );
                              }}
                            >
                              View More Details
                            </button>
                          </td>
                          <td>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              className="btn btn-default"
                              onClick={() => {
                                window.open(
                                  `${API}/order/download/${order._id}`,
                                  "_blank"
                                );
                              }}
                            >
                              Download Invoice
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span style={{ display: "flex", justifyContent: "center" }}>
          <Spinner color="#000" size={50} />
        </span>
      )}
    </>
  );
};

export default Orders;
