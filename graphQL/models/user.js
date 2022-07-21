const mongoose = require("mongoose");

const userSchema = mongoose.Schema
({
    username:{type:String, reuired:'username is required', unique:true},
    email:{type:String, reuired:'email is required', unique:true},
    password:{type:String, reuired:'password is required'},
  
},
{timestamps:true}
);


module.exports = mongoose.model('user',userSchema);

