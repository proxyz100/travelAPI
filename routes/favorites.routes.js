/**
 * @swagger
 * components:
 *  schemas:
 *   Favorite:
 *      type: object
 *      required:
 *          - UserId
 *          - DestinationId
 *      properties:
 *       UserId:
 *          type: integer
 *       DestinationId:
 *          type: integer
 *      example:
 *          "UserId": 1
 *          "DestinationId": 1
 * */
const router = require('express').Router();
const auth = require('../config/auth');
const {
  getFavorites,
  createFavorite,
  deleteFavorite,
  getFavoritesDestinationsByUser,
  getFavoritesOfUserByDestination } = require('../controllers/favorites.controller');

/**
 * @swagger
 *  tags:
 *    name: Favorites
 *    description: Endpoints for favorite destinations of the users. Available for admin and premium users.
 */


/**
 * @swagger
 *  /favorites/:
 *    get:
 *      summary: Get all the favorites
 *      tags: [Favorites]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: limit
 *          description: Limit of the favorites to return
 *          schema:
 *              type: integer
 *              required: false
 *              example: 1
 *      responses:
 *        200:
 *          description: A list of all registered favorites
 *        401:
 *          description: Unauthorized, missing token
 *        403:
 *          description: Forbidden, the user is not admin or premium
 */
router.get('/', auth.isPremium, getFavorites);

/**
 * @swagger
 *  /favorites/users/{id}:
 *    get:
 *      summary: Get favorites destinations by user
 *      tags: [Favorites]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of some user
 *          schema:
 *              type: integer
 *              required: true
 *              example: 1
 *        - in: query
 *          name: limit
 *          description: Limit of the favorites destinations to return
 *          schema:
 *              type: integer
 *              required: false
 *              example: 1
 *      responses:
 *        200:
 *          description: A list of all favorite destinations by user
 *        401:
 *          description: Unauthorized, missing token
 *        403:
 *          description: Forbidden, the user is not admin or premium
 */
router.get('/users/:id', auth.isPremium, getFavoritesDestinationsByUser);



/**
 * @swagger
 *  /favorites/destinations/{id}:
 *    get:
 *      summary: Get the list of the users who marked a destination as a favorite
 *      tags: [Favorites]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of some destination
 *          schema:
 *              type: integer
 *              required: true
 *              example: 1
 *      responses:
 *        200:
 *          description: A list of all users who marked favorite a specific destination
 *        401:
 *          description: Unauthorized, missing token
 *        403:
 *          description: Forbidden, the user is not admin or premium
 */
router.get('/destinations/:id', auth.isPremium, getFavoritesOfUserByDestination);


/**
 * @swagger
 *  /favorites/:
 *    post:
 *      summary: Craete a favorite
 *      tags: [Favorites]
 *      requestBody:
 *          description: favorite object
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Favorite'
 *      responses:
 *        201:
 *          description: Favorite succesfully created
 *        401:
 *          description: Unauthorized, missing token
 *        403:
 *          description: Forbidden, the user is not admin or premium
 */
router.post('/', createFavorite);


/**
 * @swagger
 *  /favorites/{id}:
 *    delete:
 *      summary: Delete favorite by ID
 *      tags: [Favorites]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of the favorite
 *          schema:
 *              type: integer
 *              required: true
 *              example: 1
 *      responses:
 *        200:
 *          description: The favorite has been deleted (1).
 *        401:
 *          description: Unauthorized, missing token
 *        403:
 *          description: Forbidden, the user is not admin or premium
 */
router.delete('/:id', auth.isPremium, deleteFavorite);

module.exports = router;
