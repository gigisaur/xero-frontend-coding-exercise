import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";
import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import { NewInvoice } from "./pages/NewInvoice";

const app = document.getElementById("application");

const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:80/",
    }),
    cache: new InMemoryCache(),
});

export const Application = () => (
    <ApolloProvider client={apolloClient}>
        <ToastProvider placement="top-right">
            <NewInvoice />
        </ToastProvider>
    </ApolloProvider>
);

ReactDOM.render(<Application />, app);
