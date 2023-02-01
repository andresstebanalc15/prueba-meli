import React from "react";
import { BreadcrumbsList, BreadcrumbsAnchor } from "./Breadcrums.styles";
export const Breadcrumbs = (categories) => {
  console.log(categories);
  return (
    <div>
      <BreadcrumbsList>
        {Object.values(categories).map((category, x) =>
          Object.values(category).map((path) =>
            path.path_from_root.map((cat, pos) => (
              <BreadcrumbsAnchor href="#" key={pos}>
                {cat.name}
                {pos + 1 < path.path_from_root.length ? " > " : " "}
              </BreadcrumbsAnchor>
            ))
          )
        )}
      </BreadcrumbsList>
    </div>
  );
};
