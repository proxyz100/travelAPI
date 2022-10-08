const router = require('express').Router();
const auth = require('../config/auth');
const passport = require('../config/passport');
const {
    signUp,
    logIn,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser }
    = require('../controllers/users.controller')

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: Endpoints for Users
 */

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Sign up 
 *     tags: [Users]
 *     parameters:
 *       -  in: body
 *          name: name
 *          description: First name of user
 *          schema:
 *              type: string
 *              required: true
 *              example: "Don"
 *       -  in: body
 *          name: surname
 *          description: Last name of user
 *          schema:
 *              type: string
 *              required: true
 *              example: "Dimadon"
 *       -  in: body
 *          name: email
 *          description: Email account
 *          schema:
 *              type: email
 *              required: true
 *              example: "dondimadon@hotmail.com"
 *       -  in: body
 *          name: password
 *          description: Password
 *          schema:
 *              type: string
 *              required: true
 *              example: "superStrongPass07"
 *       -  in: body
 *          name: TypeId
 *          description: ID of type of user (1-Admin, 2-Premium, 3-Basic)
 *          schema:
 *              type: integer
 *              required: true  
 * 
 *     responses:
 *       201:
 *         description: User successfully created
 */
router.post('/signUp', signUp);

router.post('/logIn', logIn);

router.get('/', [passport.authenticate('bearer', { session: false, assignProperty: 'user' }), auth.isAdmin], getUsers);
router.get('/:id', auth.isAdmin, getUser);
router.post('/', auth.isAdmin, createUser);
router.patch('/:id', auth.isAdmin, updateUser);
router.delete('/:id', auth.isAdmin, deleteUser);

module.exports = router;
