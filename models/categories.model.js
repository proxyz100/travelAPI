const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Destination = require('./destinations.model.js')
const Category = sequelize.define('Category', {
    landscape: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    icon: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isUrl: true
        }
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

//Relation many to many
Category.hasMany(Destination, { through: 'Destinations_Categories' });
Destination.hasMany(Category, { through: 'Destinations_Categories' });

module.exports = Category;
