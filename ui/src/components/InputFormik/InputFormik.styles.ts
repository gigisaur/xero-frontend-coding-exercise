import styled from "styled-components";
import { Color, FontFamily } from "../../theme";

export const Label = styled.label`
    user-select: none;
    color: ${Color.DefaultText};
    font-size: 0.9rem;
`;

export const ErrorP = styled.p`
    color: ${Color.ErrorRed};
    padding: 0;
    margin: 0;
`;

interface IInputProps {
    hasErrors: boolean;
}

export const Input = styled.input<IInputProps>`
    width: 100%;
    border: 1px solid ${(props) => props.hasErrors ? Color.ErrorRed : Color.Border};
    background-color: white;
    border-radius: 0.25rem;
    line-height: 1.3em;
    font-size: 0.9rem;
    text-indent: 0.8rem;
    padding: 0;
    box-sizing: border-box;
    font-family: ${FontFamily};
    color: ${Color.DefaultText};
    height: 2.5rem;
`;

export const ErrorContainerDiv = styled.div`
    line-height: 0.9rem;
    padding-bottom: 1rem;
    padding-top: 0.2rem;
    font-size: 0.8rem;
`;

export const FieldContentContainerDiv = styled.div`
    display: grid;
    grid-template-rows: 1.25rem minmax(2.5rem, auto) minmax(2.1rem, auto);
    box-sizing: border-box;
`;

export const Span = styled.span`
    margin-left: 0.25rem;
    color: ${Color.ErrorRed};
`;
