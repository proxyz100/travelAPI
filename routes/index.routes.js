const router = require('express').Router();
// const users = require('./users.routes');
const categories = require('./categories.routes');
// const destinations = require('./destinations.routes');
// const favorites = require('./favorites.routes');
// const types = require('./types.routes');

// The principal path
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Travel API' });
});

// Use the routes
// router.use('/users', users);
 router.use('/categories', categories);
// router.use('/destinations', destinations);
// router.use('/favorites', favorites);
// router.use('/types', types);

module.exports = router;

