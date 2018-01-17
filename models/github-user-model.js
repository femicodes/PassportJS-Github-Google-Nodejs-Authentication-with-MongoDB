const mongoose=require('mongoose');
const Schema=mongoose.Schema;


//define Schema
const githubUserSchema=new Schema({
  username:String,
  githubId:String,
  avatar_url:String,
  profile_url:String,
  name:String,
  email:String
})

//create a model-
const githubUser=mongoose.model('github-user',githubUserSchema);

module.exports=githubUser;
