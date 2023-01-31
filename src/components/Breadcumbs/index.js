import React from "react";
import { BreadcrumbsList, BreadcumbsAnchor } from "./styles";
export const Breadcrumbs = (categories) => {
  return (
    <div>
      <BreadcrumbsList>
        {Object.values(categories).map((category, x) => (
          <BreadcumbsAnchor href="#" key={x}>
            {category.name}
            <span> - </span>
          </BreadcumbsAnchor>
        ))}
      </BreadcrumbsList>
    </div>
  );
};
