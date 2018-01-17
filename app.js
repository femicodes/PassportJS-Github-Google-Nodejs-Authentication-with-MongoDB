const express=require('express');
const authRoutes=require('./routes/auth-routes');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const keys=require('./config/keys');
const passport=require('passport');
// const cookieParser=require('cookie-parser');
const profileRoutes=require('./routes/profile-routes');
const cookieSession=require('cookie-session');


const app=express();


///set  view engine
app.set('view engine','ejs');

//cookieParser use-

// app.use(cookieParser({
//   maxAge:24*60*60*1000,
//   key:[keys.session.cookieKey]
// }))

//use cookie session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));



///initialize passport
app.use(passport.initialize());

app.use(passport.session());

//connect to mongoose-
mongoose.connect(keys.mongodb.dbURI,()=>{
  console.log('connected to mongodb')
})

///serve static files-
app.use('/public',express.static('public'));

//handling routes-
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);


//home view-
app.get('/',(req,res)=>{
  res.render('home',{user:req.user});
})


///listen to port
app.listen('3000',()=>{
  console.log('Server Listening at PORT 3000')
})
