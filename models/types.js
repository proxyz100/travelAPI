const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');


const Type = sequelize.define ('Type', {
    name: {
        type: DataTypes.CHAR(64),
        allowNull: false
    }
})

module.exports = Type;