import React from "react";
import { isAuthenticated } from "../api/Auth";

import Template from "../Components/Template";
const { user } = isAuthenticated();
const Address = () => {
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
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>India</td>
                <td>
                  {user.activePack == "" ? "No Active Packs" : user.activePack}
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
