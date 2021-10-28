import React from "react";
import Template from "../Components/Template";
const Dashboard = () => {
  return (
    <div class="dashboard-wrapper user-dashboard">
      <Template active="dashboard" />
      <div class="media">
        <div class="pull-left">
          <img class="media-object user-img" src="" alt="Image" />
        </div>
        <div class="media-body">
          <h2 class="media-heading">Welcome Name ?</h2>
          <p>------------------------------</p>
        </div>
      </div>
      <div class="total-order mt-20">
        <h4>Total Orders</h4>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="#!">#252125</a>
                </td>
                <td>Mar 25, 2020</td>
                <td>2</td>
                <td>?</td>
              </tr>
              <tr>
                <td>
                  <a href="#!">#252125</a>
                </td>
                <td>Mar 25, 2020</td>
                <td>2</td>
                <td>?</td>
              </tr>
              <tr>
                <td>
                  <a href="#!">#252125</a>
                </td>
                <td>Mar 25, 2020</td>
                <td>2</td>
                <td>?</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
