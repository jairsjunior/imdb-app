const { 
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLList,
    GraphQLString, 
    GraphQLInt, 
    GraphQLFloat } = require('graphql');

const MoviesType = require('./Movies');
const MoviesModel = require('../model/Movies');

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        filmesNota: {
            type: new GraphQLList(MoviesType),
            args: { nota: { type: GraphQLFloat } },
            resolve(parent, args){
                return MoviesModel.find({ nota: { $gte: args.nota }});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

