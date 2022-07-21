const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const user = require('../models/user');
const post = require('../models/post');
const comment = require('../models/comment');



// define userType
const userType = new GraphQLObjectType({
    name: 'user',
    description: 'User Type',
    fields: () =>
    ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
})

const postType = new GraphQLObjectType({
    name: 'post',
    description: ' Post Types',
    fields: () =>
    ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        type: { type: GraphQLString },
        category: { type: GraphQLString },
        author: {
            type: userType,
            resolve(parent, args) {
                return user.findById(parent.authorId);
            },
            comment: {
                type: new GraphQLList(commentType),
                resolve(parent, args) {
                    return comment.find({ postId: parent.id });
                }
            }
        }
    })
})

const commentType = new GraphQLObjectType({
    name: 'comment',
    description: 'Comment Types',
    fields: () =>
    ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: userType,
            resolve(parent, args) {
                return user.findById(parent.userId);
            }
        },
        post: {
            type: postType,
            resolve(parent, args) {
                return post.findById(parent.postId);
            }

        },

    })
})

module.exports =
{
    userType,
    postType,
    commentType
}