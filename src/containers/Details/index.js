import React from "react";
import { Breadcrumbs } from "../../components/Breadcumbs";
import { ItemDetails } from "../../components/ItemDetails";
import { useFetchData } from "../../hocks/useFetchData";

export const Details = ({ id }) => {
  const itemInfo = "http://localhost:8000/api/items/" + id;
  const descripcionURL =
    "http://localhost:8000/api/items/" + id + "/description";

  const item = useFetchData(itemInfo);

  console.log(item);
  return (
    <div className="container">
      <Breadcrumbs />
      <div className="card p-2">
        <ItemDetails {...item.item} />
      </div>
    </div>
  );
};
