const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const secret = require('./secret');

// Passport for authorization
passport.use(new BearerStrategy((token, done) => {

  //decode the JWT token
  const body = jwt.decode(token, { secret });

  User.findOne({ where: { email: body.email } })
    .then(user => {
      if (!user)
        return done(null, false, { errors: { 'JWT token': 'invalid' } }); //error if this user is not found
      return done(null, user); //if we found we returned
    })
    .catch(done);
}));


module.exports = passport;



