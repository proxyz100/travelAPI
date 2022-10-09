/**
 * @swagger
 * components:
 *  schemas:
 *   Destination:
 *      type: object
 *      required:
 *          - name
 *          - description
 *          - cost
 *          - image
 *          - CategoryID
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        cost:
 *          type: integer
 *        image:
 *          type: string
 *        CategoryId:
 *          type: integer
 *      example:
 *        "name": "Cancún"
 *        "description": "Beautiful beach"
 *        "cost": 1116
 *        "image": "https://image.urlexample.com"
 *        "CategoryId": 1
 * */

const router = require("express").Router();
const auth = require("../config/auth");
const {
  createDestination,
  getDestination,
  getDestinations,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinations.controller");

/**
 * @swagger
 *  tags:
 *    name: Destinations
 *    description: Endpoints for Destinations
 */

/**
 * @swagger
 *  /destinations/:
 *    post:
 *      summary: Create a new destination
 *      tags: [Destinations]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          description: user object
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Destination'
 *      responses:
 *        201:
 *          description: New destination added
 *        401:
 *          description: Unauthorized
 *
 */
router.post("/", auth.isAdmin, createDestination);

/**
 * @swagger
 *  /destinations/:
 *    get:
 *      summary: Get all destinations
 *      tags: [Destinations]
 *      responses:
 *        200:
 *          description: Ok. List of destinations
 *        401:
 *          description: Unauthorized
 */

router.get("/:id", getDestination);

/**
 * @swagger
 *  /destinations/{id}:
 *    get:
 *      summary: Get destinations by ID
 *      tags: [Destinations]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of the destination
 *          schema:
 *              type: integer
 *              required: true
 *              example: 1
 *      responses:
 *        200:
 *          description: Ok. Destination with the indicated ID
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Destination with the indicated ID was not found
 */
router.get("/", getDestinations);

/**
 * @swagger
 *  /destinations/{id}:
 *    patch:
 *      summary: Update one or more fields of a Destination by ID
 *      tags: [Destinations]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of the destination
 *          schema:
 *              type: integer
 *              required: true
 *              example: 1
 *      requestBody:
 *          description: Property you want to update with its new value
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example: '{"cost": 1300}'
 *      responses:
 *        200:
 *          description: Destination updated
 *        401:
 *          description: Unauthorized user
 */
router.patch("/:id", auth.isAdmin, updateDestination);

/**
 * @swagger
 *  /destinations/{id}:
 *    delete:
 *      summary: Delete destination by ID
 *      tags: [Destinations]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of the destination
 *          schema:
 *              type: string
 *              required: true
 *              example: 1
 *      responses:
 *        200:
 *          description: Destination deleted
 *        401:
 *          description: Unauthorized user
 */
router.delete("/:id", auth.isAdmin, deleteDestination);

module.exports = router;
