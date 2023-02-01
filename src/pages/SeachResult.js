import React from "react";
import { ItemResult } from "../components/ItemResult";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useFetchData } from "../hooks/useFetchData";

export const SearchResult = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const search = queryParameters.get("search");
  const api = process.env.API;

  const todosURL = api + "/api/items?q=" + search;
  const { items = {}, categories = {} } = useFetchData(todosURL);
  return (
    <div className="container ">
      <Breadcrumbs categories={categories} />
      <div className="card p-2">
        {Object.values(items)
          .slice(0, 4)
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
