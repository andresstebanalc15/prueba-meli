import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

const client = new ApolloClient({
  uri: "https://api-mercado-libre.vercel.app/graphql",
});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
