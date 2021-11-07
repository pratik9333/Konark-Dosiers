import React from "react";

import { isAuthenticated } from "../api/Auth";

import Template from "../Components/Template";
const { user } = isAuthenticated();

const Profile = () => {
  return (
    <>
      <Template active="profile" />
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="dashboard-wrapper dashboard-user-profile">
              <div class="media">
                <div class="media-body">
                  <ul class="user-profile-list">
                    <li>
                      <span>Full Name:</span> {user.firstname} {user.lastname}
                    </li>
                    <li>
                      <span>Country:</span> India
                    </li>
                    <li>
                      <span>Email:</span>
                      {user.email}
                    </li>
                    <li>
                      <span>Phone:</span>
                      {user.phone}
                    </li>
                    <li>
                      <span>Orders:</span>
                      {user.orders == "" ? "No Orders" : user.orders}
                    </li>
                    <li>
                      <span>Phone:</span>
                      {user.activePack == ""
                        ? "No Active Packs"
                        : user.activePack}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
