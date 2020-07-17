module.exports = `
type InvoiceItemType {
    description:    String!
    cost:           String!
    quantity:       String!
    price:          String!
}

type InvoiceType {
    items:          [InvoiceItemType!]!
    totalCost:      String!
}

type Query {
    invoices:       InvoiceType!
}
`
