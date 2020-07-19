import gql from "graphql-tag";
import { IInvoice } from "..";

export interface IAddInvoiceResult {
    addInvoice: IInvoice;
}

export interface IAddInvoiceVariables {
    [key: string]: IInvoice;
}

export const addInvoiceMutation = gql`
    mutation AddInvoice($params: InvoiceCreateInput!) {
        addInvoice(params: $params) {
            items {
                description
                cost
                quantity
                price
            }
            totalCost
        }
    }
`;
