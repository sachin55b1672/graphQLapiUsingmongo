const { GraphQLList, GraphQLID } = require("graphql")
const { userType, postType, commentType } = require("./types")

const user = require('../models/user');
const post = require('../models/post');
const comment = require('../models/comment');

// GET ALL USERS
const users = {
  type: new GraphQLList(userType),
  description: "Retrieves list of users",
  resolve(parent, args) {
    return user.find()
  },
}

// GET SINGLE USER
const getUser = {
  type: userType,
  description: "Retrieves one user",
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    return user.findById(args.id)
  },
}

// GET ALL POSTS
const posts = {
  type: new GraphQLList(postType),
  description: "Retrieves list of posts",
  resolve() {
    return post.find()
  },
}
// GET ONE POST
const getPost = {
  type: postType,
  description: "Retrieves one post",
  args: { id: { type: GraphQLID } },
  resolve(_, args) {
    return post.findById(args.id)
  },
}


// GET ALL COMMENTS

const comments = {
  type: new GraphQLList(commentType),
  description: "Retrieves list of comments",
  resolve() {
    return comment.find()
  },
}

// GET ONE COMMENT
const getcomment = {
  type: commentType,
  description: "Retrieves one comment",
  args: { id: { type: GraphQLID } },
  resolve(_, args) {
    return comment.findById(args.id)
  },
}

module.exports = { users, getUser, posts, getPost, comments, getcomment }