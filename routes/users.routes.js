const router = require('express').Router();
const auth = require('../config/auth');
const {
    signUp,
    logIn,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser }
    = require('../controllers/users.controller')

router.post('/signUp', signUp);
router.post('/logIn', logIn);
router.get('/', auth.isAdmin, getUsers);
router.get('/:id', auth.isAdmin, getUser);
router.post('/', auth.isAdmin, createUser);
router.patch('/:id', auth.isAdmin, updateUser);
router.delete('/:id', auth.isAdmin, deleteUser);

module.exports = router;
