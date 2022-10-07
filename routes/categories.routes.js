const router = require('express').Router();
const auth = require('../config/auth');
const {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller')

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', auth.isAdmin, createCategory);
router.patch('/:id', auth.isAdmin, updateCategory);
router.delete('/:id', auth.isAdmin, deleteCategory);
module.exports = router;
