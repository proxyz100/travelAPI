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
router.get('/destinations/:id', auth.isPremium, getFavoritesOfUserByDestination);
router.post('/', createFavorite);
router.delete('/:id', auth.isPremium, deleteFavorite);

module.exports = router;
