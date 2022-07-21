const mongoose = require("mongoose");

const postSchema = mongoose.Schema
({
  
    title:{type:String, reuired:'is required', unique:true},
    desc:{type:String, reuired:'desc is required'},
    type:{type:String, reuired:'type is required'},
    category:{type:String, reuired:'category is required'}
},
{timestamps:true}
);


module.exports = mongoose.model('post',postSchema);

