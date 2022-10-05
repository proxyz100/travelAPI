const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Destination = sequelize.define('Destination', {
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cost: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isUrl: true
        }
    }
});

module.exports = Destination;
