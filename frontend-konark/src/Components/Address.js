import React from "react";

import Template from "../Components/Template";

const Address = () => {
  return (
    <>
      <Template active="address" />
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Name</th>
              <th>Address</th>
              <th>Country</th>
              <th class="col-md-2 col-sm-3">Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Unknown</td>
              <td>Unknown</td>
              <td>Unknown</td>
              <td>Unknown</td>
              <td>Unknown</td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-default">
                    <i class="tf-pencil2" aria-hidden="true"></i>
                  </button>
                  <button type="button" class="btn btn-default">
                    <i class="tf-ion-close" aria-hidden="true"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Unknown</td>
              <td>Unknown</td>
              <td>Unknown</td>
              <td>Unknown</td>
              <td>Unknown</td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-default">
                    <i class="tf-pencil2" aria-hidden="true"></i>
                  </button>
                  <button type="button" class="btn btn-default">
                    <i class="tf-ion-close" aria-hidden="true"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Address;
