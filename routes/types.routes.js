const router = require('express').Router();
const { 
    getTypes, 
    createType, 
    updateType, 
    deleteType } 
    = require('../controllers/types.controller')

router.get('/', getTypes); 
router.post('/', createType);
router.patch('/:id', updateType);
router.delete('/:id', deleteType);

module.exports = router;