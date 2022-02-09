import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../api/Auth";

import Template from "../Components/Template";
const { user } = isAuthenticated();
const Address = () => {
  const [User, setUser] = useState([]);

  useEffect(() => {
    setUser(user);
  }, []);
  return (
    <>
      <Template active="address" />
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th class="col-md-2 col-sm-3">Phone</th>
              <th>role</th>
              <th>Country</th>
              <th>Active Pack</th>
            </tr>
          </thead>
          <tbody>
            {
              <tr>
                <td>{User ? User.firstname : ""}</td>
                <td>{user ? User.lastname : ""}</td>
                <td>{user ? User.email : ""}</td>
                <td>{user ? User.phone : ""}</td>
                <td>{user ? User.role : ""}</td>
                <td>India</td>
                <td>
                  {User.activePack == "" ? "No Active Packs" : User.activePack}
                </td>
                <td>
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default">
                      <i class="tf-pencil2" aria-hidden="true"></i>
                    </button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Address;
