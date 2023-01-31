import React from "react";
import { SearchResult } from "../containers/SearchResult";
import { Navbar } from "../components/Navbar";
import { Details } from "../containers/Details";

export const Items = ({ id }) => {
  const queryParameters = new URLSearchParams(window.location.search);
  const search = queryParameters.get("search");
  return (
    <div>
      <Navbar />
      {id ? <Details id={id} /> : <SearchResult search={search} />}
    </div>
  );
};
