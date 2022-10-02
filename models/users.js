const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Type = require('./types');

const User = sequelize.define ('User', {
    name: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },

    surname: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },

    email: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },

    password_hash: {
        type: DataTypes.CHAR(64),
        allowNull: true,
    },
    password_salt: {
        type: DataTypes.CHAR(64),
        allowNull: true,
    }
})

User.hasOne(Type);
Type.belongsToMany(User);

module.exports = User;