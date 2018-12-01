const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = require('graphql');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        tituloFilme: { type: GraphQLString },
        posicao: { type: GraphQLInt }, 
        ano: { type: GraphQLInt },
        nota: { type: GraphQLFloat }
    })
})

module.exports = MovieType;