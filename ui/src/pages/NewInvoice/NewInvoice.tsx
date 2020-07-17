import { useMutation } from "@apollo/react-hooks";
import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import * as Yup from "yup";
import { IFormValues, IInvoice, IItem } from ".";
import { InputFormik } from "../../components/InputFormik";
import { Table, Td, Th, Tr } from "../../components/Table";
import { strings } from "../../localization";
import { addInvoiceMutation, IAddInvoiceResult, IAddInvoiceVariables } from "./graphQl/addInvoiceMutation";
import { AddItemButton, Article, Main, StyledForm, SubmitInvoiceButton , SubmitInvoiceButtonContainerDiv, TotalCostP } from "./NewInvoice.styles";

export const NewInvoice = () => {
    const { addToast } = useToasts();
    const [state, setState] = useState<IInvoice>({ items: [], totalCost: 0 });
    const [submitInvoice] = useMutation<IAddInvoiceResult, IAddInvoiceVariables>(addInvoiceMutation);

    const validationSchemaObj = Yup.object().shape({
        description: Yup.string().required(strings.Message_Description_RequiredValidation),
        cost: Yup.number().min(0, strings.Message_Cost_PositiveValidation).required(strings.Message_Cost_RequiredValidation),
        quantity: Yup.number().required(strings.Message_Quantity_RequiredValidation),
    });

    const initialValues: IFormValues = {
        description: "",
        cost: 0,
        quantity: 0,
    }

    const handleOnSubmit = (values: IFormValues) => {
        const newItem: IItem = {
            ...values,
            price: values.cost * values.quantity,
        };
        setState({ items: state.items.concat(newItem), totalCost: state.totalCost + newItem.price });
    }

    const handleOnSubmitInvoiceClick = () => {
        if (!state.items || state.items.length === 0) return;

        submitInvoice({ variables: { params: state }})
            .then(() => {
                addToast(strings.Message_InvoiceSubmitted, { appearance: "success", autoDismiss: true });
                setState({ items: [], totalCost: 0 });
            })
            .catch(() => addToast(strings.Message_UnknownError, { appearance: "error", autoDismiss: true }));
    }

    return (
        <Main>
            <Article>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleOnSubmit}
                    validateOnBlur
                    validationSchema={validationSchemaObj}
                >
                    {(formikProps: FormikProps<any>) => (
                        <StyledForm>
                            <InputFormik
                                type="text"
                                label={strings.Label_Description}
                                formikProps={formikProps}
                                name="description"
                                required
                            />
                            <InputFormik
                                type="number"
                                label={strings.Label_Cost}
                                formikProps={formikProps}
                                name="cost"
                                required
                            />
                            <InputFormik
                                type="number"
                                label={strings.Label_Quantity}
                                formikProps={formikProps}
                                name="quantity"
                                required
                            />
                            <AddItemButton type="submit">{strings.Action_AddItem}</AddItemButton>
                        </StyledForm>
                    )}
                </Formik>

                <Table>
                    <thead>
                        <tr>
                            <Th>{strings.Label_Description}</Th>
                            <Th>{strings.Label_Cost}</Th>
                            <Th>{strings.Label_Quantity}</Th>
                            <Th>{strings.Label_Price}</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.items.map(({ cost, description, quantity, price }: IItem, index: number) => (
                            // Index as key isn't ideal but it is safe here as we are only adding to the end of the list. To improve add an ID to the items and use it
                            <Tr key={index}>
                                <Td>{description}</Td>
                                <Td>${cost}</Td>
                                <Td>{quantity}</Td>
                                <Td>${price}</Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>

                <TotalCostP>{strings.formatString(strings.Label_TotalCost, state.totalCost)}</TotalCostP>

                <SubmitInvoiceButtonContainerDiv>
                    <SubmitInvoiceButton
                        type="button"
                        onClick={handleOnSubmitInvoiceClick}
                        aria-disabled={state.items.length === 0}
                    >
                        {strings.Action_SubmitInvoice}
                    </SubmitInvoiceButton>
                </SubmitInvoiceButtonContainerDiv>
            </Article>
        </Main>
    )
};
