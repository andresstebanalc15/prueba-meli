import React from "react";
import { ItemResult } from "../ItemResult";
import { Breadcrumbs } from "../Breadcumbs";
import { ItemDetails } from "../ItemDetails";
export const Details = ({ id }) => (
  <div className="container ">
    <Breadcrumbs />
    <div className="card p-2">
      <ItemDetails />
    </div>
  </div>
);
