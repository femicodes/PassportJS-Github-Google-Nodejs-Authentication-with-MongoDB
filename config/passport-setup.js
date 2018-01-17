const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const gitHubStrategy=require('passport-github');
const keys=require('./keys');
const User=require('../models/user-model');
const githubUser=require('../models/github-user-model');

//serializing the user-
passport.serializeUser((user,done)=>{
  done(null,user.id);
});

///de serializing the user-
passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  })
});

passport.use(
  new GoogleStrategy({
    ///options for google strategy
    callbackURL:'/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
  },(accessToken,refreshToken,profile,done)=>{
    //passport callback function fired just after redirect URI
    //check if user is alreay present in our database-
var profilePhotoMain=profile._json.image.url.split("?")[0]
    User.findOne({
      googleId:profile.id
    }).then((oldUser)=>{
      if(oldUser){
        //ifuser is already prsent then retrive data from Database-
        console.log('user is ',oldUser)
        done(null,oldUser);

      }else{
        //else create a New user and save it to database
        new User({
          username:profile.displayName,
          googleId:profile.id,
          profilePhoto:profilePhotoMain
        }).save().then((newUser)=>{
          console.log('new user Created'+newUser);
          done(null,newUser);
        })

      }
    })

  })
)



////--------------Github strategy for passportSetup ----------------------//////

//serializing the github user
passport.serializeUser((user,done)=>{
  done(null,user.id);
});


//deserializing the github user
passport.deserializeUser((id,done)=>{
  githubUser.findById(id).then((user)=>{
    done(null,user);
  })
});




///setup passport strategy for github
passport.use(
  new gitHubStrategy({
    ///options for gitHubStrategy-
    clientID:keys.github.clientID,
    clientSecret:keys.github.clientSecret,
    callbackURL:'/auth/github/redirect'
  },(accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    //passport callback function fired just after we redirect URI-

    ///check if user exists in database-
    githubUser.findOne({githubId:profile.id}).then((oldGithubUser)=>{
      if(oldGithubUser){
        ///if user is old github user retrive data from Database-
        console.log('user is ',oldGithubUser);
        done(null,oldGithubUser);
      }else{
        ///add into database;
        new githubUser({
          username:profile.username,
          githubId:profile.id,
          avatar_url:profile._json.avatar_url,
          profile_url:profile.profileUrl,
          name:profile.displayName,
          email:profile._json.email
        }).save().then((newGithubUser)=>{
          console.log('new Github user created :'+newGithubUser);
          done(newGithubUser);
        })

      }
    })

  })
)
