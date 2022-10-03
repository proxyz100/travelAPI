const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Destination = require('./destinations.model.js')
const Category = sequelize.define('Category', {
    landscape: {
        type: DataTypes.TEXT,
        is: /^[a-z]+$/i,
        allowNull: false
    },
    icon: {
        type: DataTypes.TEXT,
        allowNull: false,
        isUrl: true,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        is: /^[a-z]+$/i,
        allowNull: false
    },
});

//Relation many to many
Category.hasMany(Destination);
Destination.hasMany(Category);

module.exports = Category;
