import { MockedProvider } from "@apollo/react-testing";
import { act, fireEvent, render, wait } from "@testing-library/react";
import { axe } from "jest-axe";
import "jest-styled-components";
import * as React from "react";
import { ToastProvider } from "react-toast-notifications";
import { NewInvoice } from "../../src/pages/NewInvoice";
import { addInvoiceMutation } from "../../src/pages/NewInvoice/graphQl/addInvoiceMutation";
import { addInvoiceMutationErrorMocks, addInvoiceMutationMocks, params, result } from "../_data/newInvoiceMutationData";

// Intentionally leaving InputFormik and toasts unmocked for ease of testing

test(`When rendered then the HTML matches this snapshot`, () => {
    const { container, unmount } = render(
        <MockedProvider mocks={addInvoiceMutationMocks} addTypename={false}>
            <ToastProvider>
                <NewInvoice />
            </ToastProvider>
        </MockedProvider>
    );

    expect(container).toMatchSnapshot();
    unmount();
});

test(`Given form fields with values when the Add Item button is clicked then the item is added to the table and the Submit Invoice button is enabled`, async () => {
    const { container, unmount, getByLabelText, getByText } = render(
        <MockedProvider mocks={addInvoiceMutationMocks} addTypename={false}>
            <ToastProvider>
                <NewInvoice />
            </ToastProvider>
        </MockedProvider>
    );

    // Arrange the form
    const descriptionInput = getByLabelText(/Description/g);
    const costInput = getByLabelText(/Cost/g);
    const quantityInput = getByLabelText(/Quantity/g);

    act(() => { fireEvent.change(descriptionInput, { target: { value: "Apples" } }) });
    act(() => { fireEvent.change(costInput, { target: { value: 10 } }) });
    act(() => { fireEvent.change(quantityInput, { target: { value: 2 } }) });

    // Act
    await wait(() => {
        fireEvent.click(getByText("Add item"));
    });

    // Assert
    expect(container).toMatchSnapshot();
    expect(getByText("Submit invoice").getAttribute("aria-disabled")).toEqual("false");

    unmount();
});

test(`Given there are no items in the table then the Submit Invoice button is aria-disabled and clicking it does not fire a mutation`, () => {
    const mutationSpy = jest.fn();

    const mocks = [
        {
            request: {
                query: addInvoiceMutation,
                variables: { params },
            },
            result: () => {
                mutationSpy();
                return { data: { result } };
            },
        },
    ];

    const { getByText, unmount } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ToastProvider>
                <NewInvoice />
            </ToastProvider>
        </MockedProvider>
    );

    // Assert
    expect(mutationSpy).toHaveBeenCalledTimes(0);

    // Act
    act(() => {
        fireEvent.click(getByText("Submit invoice"));
    })

    // Assert
    expect(mutationSpy).toHaveBeenCalledTimes(0);
    expect(getByText("Submit invoice").getAttribute("aria-disabled")).toEqual("true");
    unmount();
});

test(`Given an item with cost $5 and quantity 2 then the price should be $10`, async () => {
    const { unmount, getByLabelText, getByText } = render(
        <MockedProvider mocks={addInvoiceMutationMocks} addTypename={false}>
            <ToastProvider>
                <NewInvoice />
            </ToastProvider>
        </MockedProvider>
    );

    // Arrange the form
    const descriptionInput = getByLabelText(/Description/g);
    const costInput = getByLabelText(/Cost/g);
    const quantityInput = getByLabelText(/Quantity/g);

    act(() => { fireEvent.change(descriptionInput, { target: { value: "Apples" } }) });
    act(() => { fireEvent.change(costInput, { target: { value: 5 } }) });
    act(() => { fireEvent.change(quantityInput, { target: { value: 2 } }) });

    // Act
    await wait(() => {
        fireEvent.click(getByText("Add item"));
    });

    // Assert
    expect(getByText("$10"));

    unmount();
});

test(`Given two items with a combined price of $30 then the Total Cost should read $30`, async () => {
    const { unmount, getByLabelText, getByText } = render(
        <MockedProvider mocks={addInvoiceMutationMocks} addTypename={false}>
            <ToastProvider>
                <NewInvoice />
            </ToastProvider>
        </MockedProvider>
    );

    // Arrange the form
    const descriptionInput = getByLabelText(/Description/g);
    const costInput = getByLabelText(/Cost/g);
    const quantityInput = getByLabelText(/Quantity/g);

    act(() => { fireEvent.change(descriptionInput, { target: { value: "Apples" } }) });
    act(() => { fireEvent.change(costInput, { target: { value: 10 } }) });
    act(() => { fireEvent.change(quantityInput, { target: { value: 2 } }) });

    await wait(() => {
        fireEvent.click(getByText("Add item"));
    });

    act(() => { fireEvent.change(descriptionInput, { target: { value: "Bananas" } }) });
    act(() => { fireEvent.change(costInput, { target: { value: 10 } }) });
    act(() => { fireEvent.change(quantityInput, { target: { value: 1 } }) });

    await wait(() => {
        fireEvent.click(getByText("Add item"));
    });

    // Assert
    expect(getByText("Total: $30"));

    unmount();
});

test(`Given an item has been added when the Submit Invoice button is clicked then the submitInvoice mutation is fired`, async () => {
    const mutationSpy = jest.fn();

    const mocks = [
        {
            request: {
                query: addInvoiceMutation,
                variables: { params },
            },
            result: () => {
                mutationSpy();
                return { data: result };
            },
        },
    ];

    const { getByText, getByLabelText, unmount } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ToastProvider>
                <NewInvoice />
            </ToastProvider>
        </MockedProvider>
    );

    // Arrange the form
    const descriptionInput = getByLabelText(/Description/g);
    const costInput = getByLabelText(/Cost/g);
    const quantityInput = getByLabelText(/Quantity/g);

    act(() => { fireEvent.change(descriptionInput, { target: { value: "Apples" } }) });
    act(() => { fireEvent.change(costInput, { target: { value: 10 } }) });
    act(() => { fireEvent.change(quantityInput, { target: { value: 2 } }) });

    await wait(() => {
        fireEvent.click(getByText("Add item"));
    });

    // Assert
    expect(mutationSpy).toHaveBeenCalledTimes(0);

    // Act
    await wait(() => {
        fireEvent.click(getByText("Submit invoice"));
    })

    await wait();

    // Assert
    expect(mutationSpy).toHaveBeenCalledTimes(1);
    expect(getByText("Submit invoice").getAttribute("aria-disabled")).toEqual("true");
    unmount();
});

test(`When the Submit Invoice mutation returns successfully then a confirmation toast is shown`, async () => {
    const { getByText, getByLabelText, unmount } = render(
        <MockedProvider mocks={addInvoiceMutationMocks} addTypename={false}>
            <ToastProvider>
                <NewInvoice />
            </ToastProvider>
        </MockedProvider>
    );

    // Arrange the form
    const descriptionInput = getByLabelText(/Description/g);
    const costInput = getByLabelText(/Cost/g);
    const quantityInput = getByLabelText(/Quantity/g);

    act(() => { fireEvent.change(descriptionInput, { target: { value: "Apples" } }) });
    act(() => { fireEvent.change(costInput, { target: { value: 10 } }) });
    act(() => { fireEvent.change(quantityInput, { target: { value: 2 } }) });

    await wait(() => {
        fireEvent.click(getByText("Add item"));
    });

    // Act
    await wait(() => {
        fireEvent.click(getByText("Submit invoice"));
    })

    await wait();

    // Assert
    expect(getByText("Invoice submitted"));
    unmount();
});

test(`When the Submit Invoice mutation errors then an error toast is shown`, async () => {
    const { getByText, getByLabelText, unmount } = render(
        <MockedProvider mocks={addInvoiceMutationErrorMocks} addTypename={false}>
            <ToastProvider>
                <NewInvoice />
            </ToastProvider>
        </MockedProvider>
    );

    // Arrange the form
    const descriptionInput = getByLabelText(/Description/g);
    const costInput = getByLabelText(/Cost/g);
    const quantityInput = getByLabelText(/Quantity/g);

    act(() => { fireEvent.change(descriptionInput, { target: { value: "Apples" } }) });
    act(() => { fireEvent.change(costInput, { target: { value: 10 } }) });
    act(() => { fireEvent.change(quantityInput, { target: { value: 2 } }) });

    await wait(() => {
        fireEvent.click(getByText("Add item"));
    });

    // Act
    await wait(() => {
        fireEvent.click(getByText("Submit invoice"));
    })

    await wait();

    // Assert
    expect(getByText("Something went wrong"));
    unmount();
});

test(`When rendered then there are no accessibility violations`, async () => {
    const { container, unmount } = render(
        <MockedProvider mocks={addInvoiceMutationMocks} addTypename={false}>
            <ToastProvider>
                <NewInvoice />
            </ToastProvider>
        </MockedProvider>
    );
    const results = await axe(container)

    expect(results).toHaveNoViolations();
    unmount();
});
