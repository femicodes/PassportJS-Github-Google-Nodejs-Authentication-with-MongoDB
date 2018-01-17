const router=require('express').Router();
const passport=require('passport');

//login route
router.get('/login',(req,res)=>{
  res.render('login',{user:req.user});
})


///login with google route-

router.get('/google',passport.authenticate('google',{
  scope:['profile']
}));

//route for redirecting user-

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  res.redirect('/profile')
})

///Logout route
router.get('/logout',(req,res)=>{
  //handle with Passportjs
  req.logout();

res.redirect('/');

})


///github Authentication  ////          ////              ////          ////
router.get('/github',passport.authenticate('github'));

//route for redirecting user-
router.get('/github/redirect',passport.authenticate('github'),(req,res)=>{
 res.redirect('/profile');

})

module.exports=router;
