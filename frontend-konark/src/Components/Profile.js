import React from "react";

import Template from "../Components/Template";

const Profile = () => {
  return (
    <>
      <Template active="profile" />
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="dashboard-wrapper dashboard-user-profile">
              <div class="media">
                <div class="pull-left text-center" href="#!">
                  <img class="media-object user-img" src="" alt="Image" />
                  <a href="#x" class="btn btn-transparent mt-20">
                    Change Image
                  </a>
                </div>
                <div class="media-body">
                  <ul class="user-profile-list">
                    <li>
                      <span>Full Name:</span>Unknown
                    </li>
                    <li>
                      <span>Country:</span>Unknown
                    </li>
                    <li>
                      <span>Email:</span>Unknown
                    </li>
                    <li>
                      <span>Phone:</span>Unknown
                    </li>
                    <li>
                      <span>Date of Birth:</span>Unknown
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
