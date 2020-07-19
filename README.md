# Invoicing App

## Running the app
The following requires that you have Node.js & npm installed.

**From the root directory:**

To install packages for the server and ui:
```
npm run restore
```

Start the server and UI:
```
npm start
```

Note: the server is hardcoded to port 80 so you'll need that free.

To run the tests with coverage report, **from the ui directory:**
```
npm run test:coverage
```

## Solution overview
I have implemented the UI with React + TypeScript and a mocked GraphQL server in JS. When submitting an invoice a GraphQL mutation is fired and the server is just returning the created invoice back (it's just a mock implementation, I spent my time in the UI). To see what is being sent you can look in the network tab.

I have made a requirements assumption that you can have negative quantity to account for item returns where it may be important for a customer to reflect their real world inventory numbers (I found this discussion thread when doing some research: https://community.xero.com/business/discussion/3456974). Also, I have validated against negative cost, and made the 3 fields required.

The UI has 100% test coverage including accessibility tests with jest-axe, functionality and snapshot tests with Jest and React Testing Library.

It is styled with styled-components. I used a couple of packages like Formik for the form, and a toast library to show confirmation on invoice submission.

## Write-up
Tell us what you'd do next if you had more time, and what else you might do to to get the code to a production-grade state.

### Backend
- Write a proper backend with input validation and tests
- Don't need to send the price or total cost to the server as you'll need to calculate and validate it server side anyway

### UI/UX improvement
- Need to be able to remove items or allow for inline edits in case a mistake is made, a clear button might be nice.
- Currency localisation. I have just hardcoded a $ symbol, however the currency would need to be localised.
- Manage loading and error states in the UI when sending to the real server.
- I would improve the mobile experience and do more testing around devices and resolution.
- I would put more thought in to the flow from submitting an invoice (to possibly loading), to confirmation, to submitting another invoice.
    - For example if the primary use case and user priority is to submit a lot of invoices quickly then something like the implemented toast notification system may be sufficient. Otherwise, you could provide a confirmation view with the submitted invoice and an option to print, for example.
- Could change the UI so that adding a new item is inline in the table rather than form fields at the top.
- I'd probably replace the required field asterisk with an icon.
- Could make the table more rich with column resizing, ordering etc. if it is likely that customers will have a lot of items (could use package like ag-grid).
- Branding if required.

### Other things for production ready
- Currently you can enter numbers too large to display nicely and that the server can't handle. Expand the Yup validation schema to make sure that what is allowed for all the fields can be handled by the server, and update the table display if needed.
- When the edit/remove item functionality is implemented then the list can no longer use index as key (see code comment NewInvoice.tsx line 97).
- Logging in the UI, at minimum when an error occurs.
- Replace the favicon.
- Make sure it meets required accessibility standards (my solution should be close WCAG 2.1 compliant + AA standard, but I would test more and I think the lack of remove/edit would be a failure of those standards).
- Test in all supported browsers (I tested in Chrome, Firefox and Edge only).
- Write end-to-end tests.
- Consider bundle size and code splitting.
- Peer review the code (if I was working with a team I would have broken it up in to logical commits).
- CI/CD pipeline.