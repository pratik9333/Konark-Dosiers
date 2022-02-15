import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../api/Auth";
import Template from "../Components/Template";
import { getUserOrders } from "../api/Order";

const Orders = () => {
  const { user, token } = isAuthenticated();

  const [Orders, setOrders] = useState();

  useEffect(() => {
    getUserOrders(user._id, token)
      .then((data) => {
        console.log(data);
        if (!data.error) {
          setOrders(data.orders);
        }
        if (data.message) {
          setOrders(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Template active="orders" />
      {Orders !== false ? (
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
                      {Orders ? (
                        Orders.map((order) => (
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
