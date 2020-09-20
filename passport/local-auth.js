const passport = require('passport');
const LocalStrategy =  require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
const user = await User.findById(id);
done(null, user);
});

passport.use('local-register', new LocalStrategy({
usernameField: 'email',
passwordField: 'pass',
passReqToCallback: true,
}, async (req, email, pass, done) => {
  const user = await User.findOne({'email': email})
 console.log(user)
 if(user) {
   return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
 } else {
   const newUser = new User();
   newUser.email = email;
   newUser.pass = newUser.encryptPassword(pass);
   newUser.firstname = req.body.firstname;
   newUser.lastname = req.body.lastname;
   newUser.city = req.body.city;
   newUser.state = req.body.state;
   newUser.phone = req.body.phone;
 console.log(newUser)
   await newUser.save();
   done(null, newUser);
 }

}));



passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'pass',
  passReqToCallback: true
}, async (req, email, pass, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, req.flash('signinMessage', 'No User Found'));
  }
  if(!user.comparePassword(pass)) {
    return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
  }
  return done(null, user);
}));
