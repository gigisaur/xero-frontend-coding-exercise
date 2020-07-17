import { IInvoice } from "../../src/pages/NewInvoice";
import { addInvoiceMutation, IAddInvoiceResult } from "../../src/pages/NewInvoice/graphQl/addInvoiceMutation";

export const params: IInvoice = {
    items: [
        {
            description: "Apples",
            cost: 10,
            quantity: 2,
            price: 20
        }
    ],
    totalCost: 20,
};

export const result: IAddInvoiceResult = {
    addInvoice: {
        items: [
            {
                description: "Apples",
                cost: 10,
                quantity: 2,
                price: 20,
            }
        ],
        totalCost: 20,
    }
};

export const addInvoiceMutationMocks = [
    {
        request: {
            query: addInvoiceMutation,
            variables: { params }
        },
        result: { data: result }
    },
];

export const addInvoiceMutationErrorMocks = [
    {
        request: {
            query: addInvoiceMutation,
            variables: { params },
        },
        result: { data: result },
        error: new Error("Something went wrong"),
    },
];
