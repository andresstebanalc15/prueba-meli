import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ItemDetails } from "../components/ItemDetails";
import { useFetchData } from "../hooks/useFetchData";

export const Details = ({ id }) => {
  const api = process.env.API;
  const itemInfo = api + "/api/items/" + id;
  const { item = {}, categories = {} } = useFetchData(itemInfo);

  return (
    <div className="container">
      <Breadcrumbs categories={categories} />

      <div className="card p-2">
        <ItemDetails {...item} />
      </div>
    </div>
  );
};
