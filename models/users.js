const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Type = require("./types");
const crypto = require("crypto");

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

User.hasOne(Type);
Type.belongsTo(User);

User.createPassword = function (plainText) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(plainText, salt, 10000, 512, "sha512")
    .toString("hex");
  
    return { salt: salt, hash: hash };
};

module.exports = User;
