import { FormikProps } from "formik";

type InputType = "text" | "number";

export interface IInputFormikProps {
    formikProps: FormikProps<any>;
    label: string;
    name: string;
    required?: boolean;
    type: InputType;
}

export * from "./InputFormik";
