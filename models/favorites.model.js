const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./users.model');
const Destination = require('./destinations.model');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

// One to many (Favorite and User)
User.hasMany(Favorite);
Favorite.belongsTo(User);

// One to many (Favorite and Destiny)
Destination.hasMany(Favorite);
Favorite.belongsTo(Destination);

// The Super Many-to-Many relationship
User.belongsToMany(Destination, { through: Favorite });
Destination.belongsToMany(User, { through: Favorite });

module.exports = Favorite;

