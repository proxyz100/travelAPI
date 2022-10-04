const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.CHAR(64),
    allowNull: false,
  },

  surname: {
    type: DataTypes.CHAR(64),
    allowNull: false,
  },

  email: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password_hash: {
    type: DataTypes.CHAR(64),
    allowNull: true,
  },
  password_salt: {
    type: DataTypes.CHAR(64),
    allowNull: true,
  },
});

User.createPassword = function (plainText) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(plainText, salt, 10000, 512, "sha512")
    .toString("hex");

  return { salt: salt, hash: hash };
};

User.validatePassword = function (password, user_salt, user_hash) {
  const hash = crypto
    .pbkdf2Sync(password, user_salt, 10000, 512, "sha512")
    .toString("hex");
  return user_hash === hash;
}

User.generateJWT = function (user) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 7);

  return jwt.sign({
    user: user.email,
    exp: parseInt(exp.getTime() / 1000)
  }, secret);
}

module.exports = User;
