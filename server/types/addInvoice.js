module.exports = `
    input InvoiceCreateInput {
        items:          [InvoiceItemsInput!]!
        totalCost:      Int
    }

    input InvoiceItemsInput {
        description:    String!
        cost:           Int!
        quantity:       Int!
        price:          Int
    }

    type Mutation {
        addInvoice(params: InvoiceCreateInput!): InvoiceType!
    }
`
