const mongoose=require('mongoose');
const Schema=mongoose.Schema;


//define Schema
const UserSchema=new Schema({
  username:String,
  googleId:String,
  profilePhoto:String
})

//create a model-
const User=mongoose.model('user',UserSchema);

module.exports=User;
