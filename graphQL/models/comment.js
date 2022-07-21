const mongoose = require('mongoose');
const commentSchema = mongoose.Schema
({
    
    comment:{type:String, required:'comment is required'},
    postId:{type:String, required:'postId is required'},
    
},{timestamps:true});
module.exports = mongoose.model('comment', commentSchema);
