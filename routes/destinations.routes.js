const router = require('express').Router();
const auth = require('../config/auth');
const {
    createDestination,
    getDestination,
    getDestinations,
    updateDestination,
    deleteDestination,
} = require('../controllers/destinations.controller')

router.post('/', auth.isAdmin, createDestination);
router.get('/:id', getDestination);
router.get('/', getDestinations);
router.patch('/:id', auth.isAdmin, updateDestination);
router.delete('/:id', auth.isAdmin, deleteDestination);

module.exports = router;
