import React, { useState, useEffect } from "react";

import { isAuthenticated } from "../api/Auth";

import Template from "../Components/Template";
const { user } = isAuthenticated();

const Profile = () => {
  const [User, setUser] = useState([]);

  useEffect(() => {
    setUser(user);
  }, []);
  return (
    <>
      <Template active="profile" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="dashboard-wrapper dashboard-user-profile">
              <div className="media">
                <div className="media-body">
                  <ul className="user-profile-list">
                    <li>
                      <span>Full Name:</span> {User ? User.firstname : ""}{" "}
                      {User ? User.lastname : ""}
                    </li>
                    <li>
                      <span>Country:</span> India
                    </li>
                    <li>
                      <span>Email:</span>
                      {User ? User.email : ""}
                    </li>
                    <li>
                      <span>Phone:</span>
                      {User ? User.phone : ""}
                    </li>
                    <li>
                      <span>Orders:</span>
                      {User.orders == "" ? "No Orders" : User.orders}
                    </li>
                    <li>
                      {User.activePack == ""
                        ? "No Active Packs"
                        : User.activePack}
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
