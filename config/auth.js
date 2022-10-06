const secret = require('./secret.js');
const { expressjwt } = require('express-jwt');

// Function to get the JWT from the HTTP Header
function getTokenFromHeader(req) {
  // Bearer <JWT>
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    return req.headers.authorization.split(' ')[1];

}

// middlewares
const auth = {
  // optional middlware
  optional: expressjwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'user',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  }),

  // middleware required
  required: (req, res, next) => {
    if (!req.auth || !req.auth.user) return res.sendStatus(401);
    next();
  },

  // middleware for admin
  isAdmin: (req, res, next) => {
    if (!req.auth) return res.sendStatus(401);
    if (req.auth.user !== 1) return res.sendStatus(403); //just the admin (forbidden)
    next();
  },

  // middleware for premium
  isPremium: (req, res, next) => {
    if (!req.auth) return res.sendStatus(401);
    console.log(req.auth);
    if (req.auth.user !== 2 && req.auth.user !== 1) return res.sendStatus(403); //just the admin (forbidden)
    next();
  },
}

module.exports = auth;

/*
  1 => Admin
  2 => Premium
  3 => Basic
*/
