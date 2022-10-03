const {Sequelize, Datatypes} = require('sequelize'); 
const sequelize = require('../config/db'); 

const Destination = sequelize.define('Destination', {
    name: {
        type: Datatypes.CHAR(64),
        allowNull: false,
        unique: true
    }, 
    description: {
        type: Datatypes.TEXT,
        allowNull: false,
    }, 
    cost: {
        type: Datatypes.DOUBLE,
        allowNull: false,
    }, 
    image: {
        type: Datatypes.TEXT,
        allowNull: false,
        unique: true, 
        validate: {
            isUrl: true
        }
    }
});

module.exports = Destination; 