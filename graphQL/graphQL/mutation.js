
const { GraphQLString, GraphQLID } = require('graphql');
const post = require('../models/post');
const user = require('../models/user');
const comment = require('../models/comment');
const { userType, commentType, postType, } = require('./types');

// REGISTER

const register =
{
    type: GraphQLString,
    args:
    {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },

    },
    async resolve(parent, args) {
        const { username, email, password } = args
        const data = new user({ username, email, password })
        await data.save();
        const saveData = 'Data is inserted';
        return saveData;
    },
}


// LOGIN

const login =
{
    type: GraphQLString,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },

    },

    async resolve(parent, args) {
        const isExist = await user.findOne({ username: args.username });
        console.log(isExist.username);
        if (!isExist || args.password !== isExist.password) {
            throw new Error("invaild credentials");
        }
        else {
            const msg = "login success";
            return msg;
        }

    }
}


// CREATE POST
const addPost = {
    type: postType,
    description: "Create new blog post",
    args: {
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        type: { type: GraphQLString },
        category: { type: GraphQLString },
    },
    resolve(parent, args) {


        const savePost = new post({

            title: args.title,
            desc: args.desc,
            type: args.type,
            category: args.category
        })

        return savePost.save()
    },
}

//   UPDATE POST

const updatePost = {
    type: postType,
    description: "Update blog post",
    args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        type: { type: GraphQLString },
        category: { type: GraphQLString },
    },
    async resolve(parent, args) {

        const postUpdated = await post.findOneAndUpdate(
            {
                _id: args.id
            },
            { title: args.title, desc: args.desc, type: args.type, category: args.category },
            {
                new: true,
                runValidators: true,
            }
        )

        if (!postUpdated) {
            throw new Error("No post with the given ID found for the author")
        }

        return postUpdated
    },
}

// DELETE POST
const deletePost = {
    type: GraphQLString,
    description: "Delete post",
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent, args) {

        const postDeleted = await post.findOneAndDelete({
            _id: args.id,
        })
        if (!postDeleted) {
            throw new Error("No post with the given ID found for the author")
        }

        return "Post deleted"
    },
}
//   CREATE COMMENT
const addComment = {
    type: commentType,
    description: "Create a new comment on the blog post",
    args: {
        comment: { type: GraphQLString },
        postId: { type: GraphQLString },
    },
    resolve(parent, args) {
        const createComment = new comment({
            postId: args.postId,
            comment: args.comment,
        })
        return createComment.save()
    },
}

//   UPDATE COMMENT
const updateComment = {
    type: commentType,
    description: "Update blog comment",
    args: {
        id: { type: GraphQLString },
        comment: { type: GraphQLString },
    },
    async resolve(parent, args) {

        const commentUpdated = await comment.findOneAndUpdate(
            {
                _id: args.id,
            },
            { comment: args.comment },
            {
                new: true,
                runValidators: true,
            }
        )

        if (!commentUpdated) {
            throw new Error("No comment with the given ID found for the author")
        }

        return commentUpdated
    },
}

//   DELETE COMMENT
const deleteComment = {
    type: GraphQLString,
    description: "Delete comment",
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent, args) {

        const commentDeleted = await comment.findOneAndDelete({
            _id: args.id,
        })
        if (!commentDeleted) {
            throw new Error("No post with the given ID found for the author")
        }

        return "Comment deleted"
    },
}


module.exports = { register, login, addPost, updatePost, deletePost, addComment, deleteComment, updateComment}