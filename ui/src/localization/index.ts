import LocalizedStrings from "react-localization";

const english = {
    Label_Loading: "Loading...",
    Message_UnknownError: "Something went wrong",

    Action_AddItem: "Add item",
    Action_SubmitInvoice: "Submit invoice",
    Label_Description: "Description",
    Label_Cost: "Cost",
    Label_Quantity: "Quantity",
    Label_Price: "Price",
    Label_TotalCost: "Total: \${0}",
    Label_Required: "Required",
    Message_InvoiceSubmitted: "Invoice submitted",

    Message_Description_RequiredValidation: "Please enter a description",
    Message_Cost_PositiveValidation: "Please enter 0 or greater",
    Message_Cost_RequiredValidation: "Please enter cost",
    Message_Quantity_RequiredValidation: "Please enter a quantity"
};

export const strings = new LocalizedStrings({
    en: {
        ...english,
    },
});
