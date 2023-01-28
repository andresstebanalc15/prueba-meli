import React from "react";
import { ItemResult } from "../ItemResult";
import { Breadcrumbs } from "../Breadcumbs";
export const SearchResult = ({ search }) => (
  <div className="container ">
    <Breadcrumbs />

    <div className="card p-2">
      <ItemResult
        price="1.980"
        title="Apple Ipod Touch"
        place="Capital federal"
      />
    </div>
  </div>
);
