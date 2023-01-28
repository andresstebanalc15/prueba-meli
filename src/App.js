import React from "react";
import { GlobalStyle } from "./assets/styles/GlobalStyles";
import { Home } from "./pages/Home";
import { Items } from "./pages/Items";
import { Router } from "@reach/router";

export const App = () => (
  <div>
    <GlobalStyle />
    <Router>
      <Home path="/" />
      <Items path="/items" />
      <Items path="/items/:id" />
    </Router>
  </div>
);
