const router = require('express').Router();
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
router.get('/', getUsers); 
router.get('/:id', getUser); 
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
