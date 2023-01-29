import React, { useEffect, useState } from "react";
import { ItemResult } from "../ItemResult";
import { Breadcrumbs } from "../Breadcumbs";

export const SearchResult = ({ search }) => {
  const [products, setProducts] = useState([]);

  useEffect(function () {
    fetch("https://api-mercado-libre-andresstebanalc15.vercel.app/products")
      .then((res) => res.json())
      .then((response) => setProducts(response));
  }, []);
  return (
    <div className="container ">
      <Breadcrumbs />

      <div className="card p-2">
        {products.map((product) => (
          <ItemResult
            price={product.item.price.amount}
            title={product.item.title}
            place={product.item.place}
            photo={product.item.picture}
          />
        ))}
      </div>
    </div>
  );
};
