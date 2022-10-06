const router = require('express').Router();
const auth = require('../config/auth');
const {
    getTypes,
    createType,
    updateType,
    deleteType }
    = require('../controllers/types.controller')

router.get('/', auth.isAdmin, getTypes);
router.post('/', auth.isAdmin, createType);
router.patch('/:id', auth.isAdmin, updateType);
router.delete('/:id', auth.isAdmin, deleteType);

module.exports = router;
