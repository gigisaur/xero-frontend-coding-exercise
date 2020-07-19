import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import "jest-styled-components";
import * as React from "react";
import { Table, Td, Th, Tr } from "../../src/components/Table";

test(`When rendered then the HTML matches this snapshot`, () => {
    const { container, unmount } = render(
        <Table>
            <thead>
                <tr>
                    <Th>Header 1</Th>
                    <Th>Header 2</Th>
                </tr>
            </thead>
            <tbody>
                <Tr>
                    <Td>Row 1 Cell 1</Td>
                    <Td>Row 1 Cell 2</Td>
                </Tr>
                <Tr>
                    <Td>Row 2 Cell 1</Td>
                    <Td>Row 2 Cell 2</Td>
                </Tr>
            </tbody>
        </Table>);

    expect(container).toMatchSnapshot();
    unmount();
});

test(`When rendered then there are no accessibility violations`, async () => {
    const { container, unmount } = render(
        <Table>
            <thead>
                <tr>
                    <Th>Header 1</Th>
                    <Th>Header 2</Th>
                </tr>
            </thead>
            <tbody>
                <Tr>
                    <Td>Row 1 Cell 1</Td>
                    <Td>Row 1 Cell 2</Td>
                </Tr>
                <Tr>
                    <Td>Row 2 Cell 1</Td>
                    <Td>Row 2 Cell 2</Td>
                </Tr>
            </tbody>
        </Table>
    );
    const results = await axe(container)

    expect(results).toHaveNoViolations();
    unmount();
});
