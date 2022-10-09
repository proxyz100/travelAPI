/**
 * @swagger
 * components:
 *  schemas:  
 *   Category:
 *      Type: object
 *      required:
 *          - lanscape
 *          - icon
 *          - description
 *      properties:
 *       id:
 *          type:integer
 *      landscape:
 *         type: text
 *      icon:
 *          type: text
 *      description:
 *          type: text
 *      example:  
 *          "landscape": "island"
 *          "icon": "https://www.flaticon.es/icono-gratis/isla_3094941?term=island&page=1&position=28&page=1&position=28&related_id=3094941&origin=search"
 *          "description": "Area of land smaller than a continent and entirely surrounded by water."
 * */
const router = require('express').Router();
const auth = require('../config/auth');
const {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller');
const Category = require('../models/categories.model');


/**
* @swagger
*  tags:
*    name: Categories
*    description: Endpoints for Categories
*/

/**
* @swagger
* /categories/:
*  get:
*    summary: Get all Categories
*    tags: [Categories]
*    
*    responses:
*       200:
*         description: A list of all registered categories
*         schema:
*          $ref: '#/components/Category'
* */

router.get('/', getCategories);


/**
 * @swagger
 *  /categories/{id}:
 *    get:
 *      summary: Get category by Id
 *      tags: [Categories]
  *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id for each category
 *          schema:
 *            type: integer
 *            required: true
 *            example: 1
 *      responses:
 *        200:
 *          description: Category registered with the ID.
 */
router.get('/:id', getCategory);



/**
 * @swagger
 *  /categories/:
 *      post:
 *          summary: Create new Category
 *          tags: [Categories]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *             description: Category object
 *             required: true
 *             content:
 *                  application/json:
 *                      schema:
 *                       $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: New Type has been created
 *              
 *              401:
 *                  description: Unauthorized - the user is not admin             
 */

router.post('/', auth.isAdmin, createCategory);

/**
* @swagger
*  /categories/{id}:
*      patch:
*          summary: Update Category
*          tags: [Categories]
*          security:
*              - bearerAuth: []
*          parameters:
*              -   in: path
*                  name: id
*                  description: Unique id of Category
*                  schema:
*                      type: integer
*                      required: true
*                      example: '1'
*          requestBody:
*              description: Property you want to update 
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          example:  '{"landscape": "forest"}'
*          responses:
*              201:
*                  description: Type a new name
*                  schema:
*                      $ref: '#/components/Category'
*              401:
*                  description: Unauthorized - the user is not admin             
*/

router.patch('/:id', auth.isAdmin, updateCategory);


/**
 * @swagger
 *  /categories/{id}:
 *      delete: 
 *          summary: Delete Category by Id
 *          tags: [Categories]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: Unique id of Category
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
router.delete('/:id', auth.isAdmin, deleteCategory);
module.exports = router;
