import React from "react";
import { Breadcrumbs } from "../Breadcumbs";
import { ItemDetails } from "../ItemDetails";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

const itemById = graphql(gql`
  query products {
    id
    categories {
      name
    }
    author {
      name
      lastname
    }
    item {
      title
      picture
      condition
      free_shipping
      sold_quantity
      place
      description
    }
  }
`);

const DetailsComponent = (props) => {
  console.log(props);
  return (
    <div className="container ">
      <Breadcrumbs />
      <div className="card p-2">
        <ItemDetails />
      </div>
    </div>
  );
};

export const Details = itemById(DetailsComponent);
