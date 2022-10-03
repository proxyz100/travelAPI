const router = require('express').Router();

const{
    createDestination,
    getDestination, 
    getDestinations, 
    updateDestination,
    deleteDestination,
} = require('../controllers/destinations.controller')

router.post('/', createDestination); 
router.get('/:id', getDestination); 
router.get('/', getDestinations);
router.patch('/:id', updateDestination);
router.delete('/:id', deleteDestination); 

module.exports = router; 