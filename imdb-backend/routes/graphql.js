const graphqlHTTP = require('express-graphql');
const schema = require('../modules/graphql/schema');

// The root provides a resolver function for each API endpoint
const root = {
  movies: () => {
    return 'Find Movies!';
  },
};

module.exports = graphqlHTTP({ 
    schema: schema,
    rootValue: root,
    graphiql: true,
});