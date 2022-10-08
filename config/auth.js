const secret = require('./secret.js');
const { expressjwt } = require('express-jwt');
const Type = require('../models/types.model');

// Function to get the JWT from the HTTP Header
function getTokenFromHeader(req) {
  // Bearer <JWT>
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    return req.headers.authorization.split(' ')[1];

}

async function getTypeUser(id) {
  const { name: typeUser } = await Type.findByPk(id);
  return typeUser;
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
  isAdmin: async (req, res, next) => {
    if (!req.auth) return res.sendStatus(401);
    const typeUserName = await getTypeUser(req.auth.user);
    if (typeUserName.toLowerCase() !== 'admin') return res.sendStatus(403); //just the admin (forbidden)
    next();
  },

  // middleware for premium
  isPremium: async (req, res, next) => {
    if (!req.auth) return res.sendStatus(401);
    const typeUserName = await getTypeUser(req.auth.user);
    if (typeUserName.toLowerCase() !== 'premium' && typeUserName.toLowerCase() !== 'admin') return res.sendStatus(403); //just the admin (forbidden)
    next();
  },
}

module.exports = auth;

/*
  1 => Admin
  2 => Premium
  3 => Basic
*/
