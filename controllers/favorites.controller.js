const Favorite = require("../models/favorites.model");


async function getFavorites(req, res) {
  const favorites = await Favorite.findAll();
  res.status(200).json(favorites);
}

async function createFavorite(req, res) {
  const body = req.body; //UserId, DestinationId
  const favorite = await Favorite.create(body);
  res.status(201).json(favorite);
}

async function deleteFav(req, res) {
  const id = req.params.id;
  const favoriteDeleted = Favorite.destroy({ where: { id } });
  res.status(200).json(favoriteDeleted);
}
