const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./users.model');


const Type = sequelize.define('Type', {
    name: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        unique: true,
    }
})

Type.hasMany(User);
User.belongsTo(Type);

module.exports = Type;
