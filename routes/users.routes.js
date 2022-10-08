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
 * /users/signUp:
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
 *          description: A super strong password
 *          schema:
 *              type: string
 *              required: true
 *              example: "password07"
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

/**
 * @swagger
 * /users/logIn:
 *   post:
 *     summary: Log in 
 *     description: Log in with previously created user
 *     tags: [Users]
 *     parameters:
 *       -  in: body
 *          name: email
 *          description: Registered email 
 *          schema:
 *              type: email
 *              required: true
 *              example: "dondimadon@hotmail.com"
 *       -  in: body
 *          name: password
 *          description: User's password
 *          schema:
 *              type: string
 *              required: true
 *              example: "password07" 
 * 
 *     responses:
 *       200:
 *         description: Log in with valid token
 */
router.post('/logIn', logIn);

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security: 
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all registered users
 *       401:
 *         description: Unauthorized the user is not admin
 */
router.get('/', [passport.authenticate('bearer', { session: false, assignProperty: 'user' }), auth.isAdmin], getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get users by ID
 *     tags: [Users]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *       -  in: path
 *          name: id
 *          description: Unique id of the user
 *          schema:
 *              type: integer
 *              required: true
 *              example: 1      
 *     responses:
 *       200:
 *         description: The user registered with the indicated ID.
 *       401:
 *         description: Unauthorized the user is not admin
 */
router.get('/:id', auth.isAdmin, getUser);

// Not sure if we should add documentation
router.post('/', auth.isAdmin, createUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update one or many fields of a User by ID
 *     tags: [Users]
 *     security: 
 *        - BearerAuth: [] 
 *     parameters:
 *       -  in: path
 *          name: id
 *          description: Unique id of the user
 *          schema:
 *              type: integer
 *              required: true
 *              example: 1 
 *       -  in: body
 *          name: property
 *          description: property you want to update with its new value
 *          schema:
 *              type: string
 *              required: true
 *      
 *     responses:
 *       200:
 *         description: The user has been deleted.
 *       401:
 *         description: Unauthorized the user is not admin.
 */
router.patch('/:id', auth.isAdmin, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     security: 
 *        - BearerAuth: [] 
 *     parameters:
 *       -  in: path
 *          name: id
 *          description: Unique id of the user
 *          schema:
 *              type: integer
 *              required: true
 *              example: 1      
 *     responses:
 *       200:
 *         description: The user has been deleted.
 *       401:
 *         description: Unauthorized the user is not admin.
 */
router.delete('/:id', auth.isAdmin, deleteUser);

module.exports = router;
