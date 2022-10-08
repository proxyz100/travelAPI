const router = require('express').Router();
const auth = require('../config/auth');
const {
  getFavorites,
  createFavorite,
  deleteFavorite,
  getFavoritesDestinationsByUser,
  getFavoritesOfUserByDestination } = require('../controllers/favorites.controller');

router.get('/', auth.isPremium, getFavorites);
router.get('/users/:id', auth.isPremium, getFavoritesDestinationsByUser);
router.get('/destinations/:id', auth.isPremium, getFavoritesOfUserByDestination);
router.post('/', createFavorite);
router.delete('/:id', auth.isPremium, deleteFavorite);

module.exports = router;
