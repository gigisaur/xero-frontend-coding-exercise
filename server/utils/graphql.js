const { makeExecutableSchema } = require("graphql-tools");
const graphqlHTTP = require("express-graphql");
const resolvers = require("../resolvers");
const typeDefs = require("../types");

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
});

const runServer = graphqlHTTP(async (req, res) => {
    return new Promise((resolve) => {
        const ctx = {
            shortName: "token.shortName",
            userName: "token.userName",
        }

        resolve({
            schema,
            graphiql: true,
            context: ctx,
        });

    });
})

module.exports = {
    runServer
}