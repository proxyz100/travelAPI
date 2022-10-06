const router = require('express').Router();

const {
  getFavorites,
  createFavorite,
  deleteFavorite,
  getFavoritesDestinationsByUser,
  getFavoritesOfUserByDestination } = require('../controllers/favorites.controller');

router.get('/', getFavorites);
router.get('/users/:id', getFavoritesDestinationsByUser);
router.get('/destinations/:id', getFavoritesOfUserByDestination);
router.post('/', createFavorite);
router.delete('/:id', deleteFavorite);

module.exports = router;
