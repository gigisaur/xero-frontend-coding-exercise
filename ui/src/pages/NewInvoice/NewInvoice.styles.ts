import { Form } from "formik";
import styled from "styled-components";
import { ButtonBase, Color, FontFamily } from "../../theme";

export const StyledForm = styled(Form)`
    display: grid;
    align-items: end;
    grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
    grid-row-gap: 0.5rem;
    grid-column-gap: 0.5rem;
    margin-bottom: 2rem;
`;

export const Main = styled.main`
    background-color: ${Color.PageBackground};
    border-top: 0.5rem solid ${Color.Accent};
    width: 100%;
    font-family: ${FontFamily};
`;

export const Article = styled.article`
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 50%;
    min-width: 18.75rem;
    min-height: 31.25rem;
    margin-top: 5%;
    background-color: ${Color.ContentBackground};
    box-shadow: 0 -2px 0.75rem rgba(0, 0, 0, 0.03);
    padding: 1rem;
`;

export const TotalCostP = styled.p`
    align-items: end;
    margin-top: 2rem;
    align-content: end;
    display: grid;
    flex: 1;
    justify-content: end;
`;

export const SubmitInvoiceButton = styled(ButtonBase)`
    color: white;
    background-color: ${Color.Accent};

    &:hover {
        background-color: ${Color.PrimaryButtonHoverBackground};
    }
`;

export const AddItemButton = styled(ButtonBase)`
    color: ${Color.Accent};
    background-color: white;
    border: 1px solid ${Color.Accent};
    padding: 0 0.9rem;
    align-self: start;
    margin-top: 1.25rem;

    &:hover {
        background-color: ${Color.Accent};
        color: white;
    }
`;

export const SubmitInvoiceButtonContainerDiv = styled.div`
    display: grid;
    justify-items: end;
`;
