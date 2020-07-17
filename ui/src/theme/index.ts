import styled from "styled-components";

export const FontFamily = "Roboto, Arial, Helvetica, sans-serif";

export const Color = {
    Accent: "#00b7e2",
    DefaultText: "#191919",
    Border: "#DAE5EC",
    ErrorRed: "#E23636",
    PageBackground: "#e9ebec",
    ContentBackground: "#fafafa",
    TableBorder: "#EBF6FF",
    PrimaryButtonHoverBackground: "#0097bb",
}

export const ButtonBase = styled.button`
    align-items: center;
    border: none;
    border-radius: 0.25rem;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    height: 2.5rem;
    justify-content: center;
    transition: all ease-in-out 0.2s;
    vertical-align: top;
    white-space: nowrap;
    font-weight: bold;
    padding: 0 1.5rem;
    position: relative;
    font-size: 1rem;
    text-transform: capitalize;
    letter-spacing: 0.01rem;
    font-family: inherit;

    &[aria-disabled='true'] {
        opacity: 0.4;
        pointer-events: none;
    }
`;
