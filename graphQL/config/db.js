// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/graphQL',{useUnifiedTopology:true,useNewUrlParser:true},(err)=>
// {
//     if(!err)
//     {
//         console.log('database connection success...');
//     }
//     else
//     {
//         console.log('database connection failed');
//     }
// });
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("my sql  connect");
});
