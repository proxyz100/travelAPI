const Favorite = require("../models/favorites.model");
const User = require('../models/users.model')
const Destination = require('../models/destinations.model')

async function getFavorites(req, res) {
  const limit = req.query.limit;
  const favoritesResult = await Favorite.findAll({ include: Destination }); // maybe change this statement and use include

  const favorites = favoritesResult.slice(0, limit ?? favoritesResult.length)
    .map(favorite => {
      const destinationUrl = `${process.env['BASE_URL']}/destinations/${favorite.Destination.id}`;
      const favoriteCopy = { ...favorite.dataValues }
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
  const limit = req.query.limit;
  const result = await User.findByPk(idUser, { include: Destination });
  const favoritesUser = result.Destinations.slice(0, limit ?? result.Destinations.length);
  res.status(200).json(favoritesUser);
}

async function getFavoritesOfUserByDestination(req, res) {
  const idDestination = req.params.id;
  const result = await Destination.findByPk(idDestination, { include: User });
  const favoritesDestination = result.Users;
  res.status(200).json(favoritesDestination);
}

async function deleteFavorite(req, res) {
  const id = req.params.id;
  const favoriteDeleted = await Favorite.destroy({ where: { id } });
  res.status(200).json(favoriteDeleted);
}


module.exports = {
  getFavorites,
  createFavorite,
  deleteFavorite,
  getFavoritesDestinationsByUser,
  getFavoritesOfUserByDestination
}
