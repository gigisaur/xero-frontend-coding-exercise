import { act, fireEvent, render, wait } from "@testing-library/react";
import { Formik, FormikProps } from "formik";
import { axe } from "jest-axe";
import "jest-styled-components";
import * as React from "react";
import { InputFormik } from "../../src/components/InputFormik";

const propsMock: any = {
    label: "Foo label",
    name: "name",
    type: "text",
}

test(`When rendered then the HTML matches this snapshot`, () => {
    const { unmount, container } = render(
        <Formik
            initialValues={{ name: "" }}
            // tslint:disable-next-line: no-empty
            onSubmit={() => {}}
        >
            {(formProps: FormikProps<any>) => (
                <form onSubmit={formProps.handleSubmit}>
                    <InputFormik {...propsMock} formikProps={formProps} />
                </form>
            )}
        </Formik>);

    expect(container).toMatchSnapshot();
    unmount();
});

test(`Given type number when rendered then input has type correctly set`, () => {
    const { unmount, getByLabelText } = render(
        <Formik
            initialValues={{ name: "" }}
            // tslint:disable-next-line: no-empty
            onSubmit={() => {}}
        >
            {(formProps: FormikProps<any>) => (
                <form onSubmit={formProps.handleSubmit}>
                    <InputFormik {...propsMock} formikProps={formProps} type="number" />
                </form>
            )}
        </Formik>);

    expect(getByLabelText("Foo label").getAttribute("type")).toEqual("number");
    unmount();
});

test(`Given required is true when rendered then required asterisk is shown`, () => {
    const { unmount, getByText } = render(
        <Formik
            initialValues={{ name: "" }}
            // tslint:disable-next-line: no-empty
            onSubmit={() => {}}
        >
            {(formProps: FormikProps<any>) => (
                <form onSubmit={formProps.handleSubmit}>
                    <InputFormik {...propsMock} formikProps={formProps} required />
                </form>
            )}
        </Formik>);

    expect(getByText("*"));
    unmount();
});

describe(`Given there are errors for the input`, () => {
    test(`Then the error message is shown`, async () => {
        const { unmount, getByLabelText, getByText, queryByText } = render(
            <Formik
                initialValues={{ name: "" }}
                // tslint:disable-next-line: no-empty
                onSubmit={() => {}}
                validateOnBlur
                validate={() => ({ name: "Test error message" })}
            >
                {(formProps: FormikProps<any>) => (
                    <form onSubmit={formProps.handleSubmit}>
                        <InputFormik {...propsMock} formikProps={formProps} required />
                    </form>
                )}
            </Formik>);

        expect(queryByText("Test error message")).toBeNull();

        act(() => {
            fireEvent.blur(getByLabelText(/Foo label/g));
        });

        await wait();

        expect(getByText("Test error message"));
        unmount();
    });

    test(`Then there are no accessibility violations`, async () => {
        const { unmount, getByLabelText, container } = render(
            <Formik
                initialValues={{ name: "" }}
                // tslint:disable-next-line: no-empty
                onSubmit={() => {}}
                validateOnBlur
                validate={() => ({ name: "Test error message" })}
            >
                {(formProps: FormikProps<any>) => (
                    <form onSubmit={formProps.handleSubmit}>
                        <InputFormik {...propsMock} formikProps={formProps} required />
                    </form>
                )}
            </Formik>);

        act(() => {
            fireEvent.blur(getByLabelText(/Foo label/g));
        });

        const results = await axe(container)

        expect(results).toHaveNoViolations();
        unmount();
    });
})

test(`When rendered then there are no accessibility violations`, async () => {
    const { container, unmount } = render(
        <Formik
            initialValues={{ name: "" }}
            // tslint:disable-next-line: no-empty
            onSubmit={() => {}}
        >
            {(formProps: FormikProps<any>) => (
                <form onSubmit={formProps.handleSubmit}>
                    <InputFormik {...propsMock} formikProps={formProps} />
                </form>
            )}
        </Formik>);
    const results = await axe(container)

    expect(results).toHaveNoViolations();
    unmount();
});
