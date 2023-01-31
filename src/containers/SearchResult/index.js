import React from "react";
import { ItemResult } from "../../components/ItemResult";
import { Breadcrumbs } from "../../components/Breadcumbs";
import { useFetchData } from "../../hocks/useFetchData";

export const SearchResult = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const search = queryParameters.get("search");
  const todosURL = "http://localhost:8000/api/items?q=" + search;
  const { items = {} } = useFetchData(todosURL);
  return (
    <div className="container ">
      <Breadcrumbs />
      <div className="card p-2">
        {Object.values(items)
          .filter((i, index) => index < 4)
          .map((product) => (
            <ItemResult
              key={product.id}
              id={product.id}
              price={product.price.amount}
              title={product.title}
              place={product.place}
              photo={product.picture}
            />
          ))}
      </div>
    </div>
  );
};
