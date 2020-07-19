import { Field, FieldProps } from "formik"
import * as _ from "lodash";
import React from "react"
import { IInputFormikProps } from ".";
import { strings } from "../../localization";
import { ErrorContainerDiv, ErrorP, FieldContentContainerDiv, Input, Label, Span } from "./InputFormik.styles";

export const InputFormik = ({ name, formikProps, label, required, type }: IInputFormikProps) => {
    return (
        <Field name={name}>
            {(props: FieldProps) => (
                <FieldContentContainerDiv>
                    <Label htmlFor={name}>
                        {label}
                        {required &&
                            <Span title={strings.Label_Required}>*</Span>
                        }
                    </Label>
                    <Input
                        {...props.field}
                        aria-describedby={`${name}_describedby`}
                        aria-invalid={formikProps.errors[name] !== undefined && formikProps.touched[name] === true}
                        aria-required={required}
                        hasErrors={formikProps.errors[name] !== undefined && formikProps.touched[name] === true}
                        id={name}
                        type={type}
                    />
                    <ErrorContainerDiv>
                        {(formikProps && formikProps.errors && _.get(formikProps.errors, name))
                            && (formikProps && formikProps.touched && _.get(formikProps.touched, name))
                            && <ErrorP id={`${name}_describedby`} aria-live="assertive" role="alert" >{_.get(formikProps.errors, name)}</ErrorP>}
                    </ErrorContainerDiv>
                </FieldContentContainerDiv>
            )}
        </Field>
    );
}
