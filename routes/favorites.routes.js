const router = require('express').Router();
const auth = require('../config/auth');
const {
  getFavorites,
  createFavorite,
  deleteFavorite,
  getFavoritesDestinationsByUser,
  getFavoritesOfUserByDestination } = require('../controllers/favorites.controller');

router.get('/', getFavorites);
router.get('/users/:id', getFavoritesDestinationsByUser);
router.get('/destinations/:id', getFavoritesOfUserByDestination);
router.post('/', auth.isPremium, createFavorite);
router.delete('/:id', deleteFavorite);

module.exports = router;
