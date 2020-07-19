const { mergeTypes } = require("merge-graphql-schemas");

const addInvoice = require("./addInvoice");
const invoice = require("./invoice");

module.exports = mergeTypes([addInvoice, invoice], {
  all: true,
});
