const Favorite = require("../models/favorites.model");
const User = require('../models/users.model')
const Destination = require('../models/destinations.model')

async function getFavorites(req, res) {
  const favoritesResult = await Favorite.findAll({ include: [User, Destination] }); // maybe change this statement and use include
  // Maybe Build the URL
  const favorites = favoritesResult.map(favorite => {
    const userUrl = `http://localhost:4000/users/${favorite.User.id}`;
    const destinationUrl = `http://localhost:4000/destinations/${favorite.Destination.id}`;
    const favoriteCopy = { ...favorite.dataValues }
    favoriteCopy.User = userUrl;
    favoriteCopy.Destination = destinationUrl;
    return favoriteCopy;
  });
  res.status(200).json(favorites);
}

async function createFavorite(req, res) {
  const body = req.body; //UserId, DestinationId
  const favorite = await Favorite.create(body);
  res.status(201).json(favorite);
}

async function getFavoritesDestinationsByUser(req, res) {
  const idUser = req.params.id;
  const result = await User.findByPk(idUser, { include: Destination }); // maybe change this statement and use include
  const favoritesUser = result.Destinations;
  res.status(200).json(favoritesUser);
}

async function getFavoritesOfUserByDestination(req, res) {
  const idDestination = req.params.id;
  const result = await Destination.findByPk(idDestination, { include: User }); // maybe change this statement and use include
  const favoritesDestination = result.Users;
  res.status(200).json(favoritesDestination);
}

async function deleteFavorite(req, res) {
  const id = req.params.id;
  const favoriteDeleted = Favorite.destroy({ where: { id } });
  res.status(200).json(favoriteDeleted);
}


module.exports = {
  getFavorites,
  createFavorite,
  deleteFavorite,
  getFavoritesDestinationsByUser,
  getFavoritesOfUserByDestination
}
