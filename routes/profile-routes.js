const router=require('express').Router();

//middleware to check if user is logged in-
const authCheck=(req,res,next)=>{
  if(!req.user){
    //if user not logged in
    res.redirect('/auth/login');
  }else{
    /// if they logged in-
    next();
  }
}

///middleware to check if user is logged in through github-



router.get('/',authCheck,(req,res)=>{
  res.render('profile',{user:req.user});
})
module.exports=router;
