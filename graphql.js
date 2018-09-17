const graphqlHTTP = require('express-graphql');
app.use(
    '/graphql',
    graphqlHTTP({
        schema: GraphQLSchema,
        graphiql: true
    })
);