const passport = require('passport');
const GoogleStrategy=require("passport-google-oauth20").Strategy
const keys=require('../config/keys')
const mongoose=require('mongoose')
const Users=mongoose.model('users')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    user.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(   
    new GoogleStrategy({
        clientID:keys.clientID,
        clientSecret:keys.clientSecret,
        callbackURL:'/auth/google/callback'
    },(accessToken, refreshToken, profile, done)=>{
        console.log('profile' + profile)
        //findone use to identify duplicating in db 
        Users.findOne({userId:profile.id})
    .then((existingUser)=>{
                if(existingUser){
                    done(null,existingUser)
            }else{
                new Users({userId:profile.id}).save()
                .then((user)=>{
                    done(null,user)
                })
            }
        })
        
    })
    
)