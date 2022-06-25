import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.min.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./graphql/apolloClient";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={createApolloClient()}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
