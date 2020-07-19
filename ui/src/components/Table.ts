import styled from "styled-components";
import { Color } from "../theme";

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    border: 1px solid ${Color.TableBorder};
`;

export const Td = styled.td`
    padding: 0.5rem;
    color: ${Color.DefaultText};
    font-size: 0.9rem;
    border-bottom: 1px solid ${Color.TableBorder};
`;

export const Th = styled.th`
    padding: 0.5rem;
    border-bottom: 1px solid ${Color.Border};
    color: ${Color.DefaultText};
    opacity: 0.75;
    font-size: 0.8rem;
    text-transform: uppercase;
    text-align: left;
`;

export const Tr = styled.tr`
    &:nth-child(odd) {
        background-color: ${Color.TableBorder};
    }
`;
