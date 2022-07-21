// import requireed stuff from graphQL
const { GraphQLObjectType, GraphQLSchema } = require('graphql');


// import query
const { users, getUser, posts, getPost, comments, getcomment } = require('./query');

// import mutation

const { register, login, addPost, updatePost, deletePost, addComment, updateComment, deleteComment } = require('./mutation');

// define query types.

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: { users, getUser, posts, getPost, comments, getcomment },

})
// define mutationType
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations',
    fields: { register, login, addPost, updatePost, deletePost, addComment, updateComment, deleteComment },
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
})
