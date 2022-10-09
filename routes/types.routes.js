/**
 * @swagger
 * components:
 *  schemas:
 *   Type:
 *      type: object
 *      required:
 *          - name
 *      properties:
 *       id:
 *          type: integer
 *       name:
 *          type: string
 *          required: true
 *      example:
 *          "id": 1
 *          "name": "Admin"
 * */

const router = require('express').Router();
const auth = require('../config/auth');
const {
    getTypes,
    createType,
    updateType,
    deleteType }
    = require('../controllers/types.controller')

/**
 * @swagger
 *  tags:
 *    name: Types
 *    description: Endpoints for Types
 */

/**
 * @swagger
 *  /types/:
 *      get:
 *          summary: Get all Types of users
 *          tags: [Types]
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: A list of all types is displayed.
 *                  schema:
 *                      $ref: '#/components/schemas/Type'
 *              401:
 *                  description: Unauthorized - the user is not admin
 */
router.get('/', auth.isAdmin, getTypes);

/**
 * @swagger
 *  /types/:
 *      post:
 *          summary: Create a new Type
 *          tags: [Types]
 *          requestBody:
 *              description: Name of new Type
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: '{"name": "Basic"}'
 *          responses:
 *              201:
 *                  description: New Type has been created
 *                  schema:
 *                      $ref: '#/components/schemas/Type'
 *              400:
 *                  description: Bad Request (i.e. missing required field)
 *              401:
 *                  description: Unauthorized - the user is not admin
 */
router.post('/', createType);

/**
 * @swagger
 *  /types/{id}:
 *      patch:
 *          summary: Update Type
 *          tags: [Types]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: Unique id of Type
 *                  schema:
 *                      type: integer
 *                      required: true
 *                      example: '1'
 *          requestBody:
 *              description: Property you want to update with a new value
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: '{"name": "Admin"}'
 *          responses:
 *              201:
 *                  description: Type with new name
 *                  schema:
 *                      $ref: '#/components/schemas/Type'
 *              400:
 *                  description: Bad Request (i.e. missing required field)
 *              401:
 *                  description: Unauthorized - the user is not admin
 */
router.patch('/:id', auth.isAdmin, updateType);

/**
 * @swagger
 *  /types/{id}:
 *      delete:
 *          summary: Delete Type by Id
 *          tags: [Types]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: Unique id of Type
 *                  schema:
 *                      type: integer
 *                      required: true
 *                      example: '1'
 *          responses:
 *              200:
 *                  description: The type has been deleted.
 *              401:
 *                  description: Unauthorized the user is not admin.
 */
router.delete('/:id', auth.isAdmin, deleteType);

module.exports = router;
