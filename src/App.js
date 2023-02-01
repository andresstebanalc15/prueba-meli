import React from "react";
import { GlobalStyle } from "./assets/styles/GlobalStyles";
import { Router } from "@reach/router";
import { Details } from "./pages/Details";
import { SearchResult } from "./pages/SeachResult";
import { Navbar } from "./components/Navbar";
export const App = () => (
  <div>
    <GlobalStyle />
    <Navbar />
    <Router>
      <SearchResult path="/items" />
      <Details path="/items/:id" />
    </Router>
  </div>
);
