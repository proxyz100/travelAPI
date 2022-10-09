/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *      type: object
 *      required:
 *          - name
 *          - surname
 *          - email
 *          - password
 *          - TypeID
 *      properties:
 *       name:
 *          type: string
 *       surname:
 *          type: string
 *       email:
 *          type: string
 *       password:
 *          type: string
 *       TypeId:
 *          type: integer
 *      example:
 *          "name": "Dom"
 *          "surname": "Dimadon"
 *          "email": "domdimadon@hotmail.com"
 *          "password": "password2"
 *          "TypeId": 1
 * */

const router = require("express").Router();
const auth = require("../config/auth");
const passport = require("../config/passport");
const {
  signUp,
  logIn,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: Endpoints for Users
 */

/**
 * @swagger
 *  /users/signUp:
 *    post:
 *      summary: Sign up with valid email
 *      tags: [Users]
 *      requestBody:
 *          description: user object
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      responses:
 *        201:
 *          description: User succesfully created
 *        400:
 *          description: Bad request (i.e. Email must be unique, property cannot be null)
 */
router.post("/signUp", signUp);

/**
 * @swagger
 *  /users/logIn:
 *    post:
 *      summary: Log in
 *      description: Log in with valid email and password
 *      tags: [Users]
 *      requestBody:
 *          description: user object
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example: '{"email": "domdimadon@hotmail.com", "password": "password2"}'
 *      responses:
 *        200:
 *          description: User is logged and new token is generated.
 *        400:
 *          description: Bad request (i.e. missing required field, wrong email or password)
 */
router.post("/logIn", logIn);

/**
 * @swagger
 *  /users/:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      security:
 *        - bearerAuth: [admin]
 *      responses:
 *        200:
 *          description: A list of all registered users
 *        401:
 *          description: Unauthorized the user is not admin
 */
router.get(
  "/",
  [
    passport.authenticate("bearer", { session: false, assignProperty: "user" }),
    auth.isAdmin,
  ],
  getUsers
);

/**
 * @swagger
 *  /users/{id}:
 *    get:
 *      summary: Get user by ID
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of the user
 *          schema:
 *            type: integer
 *            required: true
 *            example: 1
 *      responses:
 *        200:
 *          description: The user registered with the indicated ID.
 *        401:
 *          description: Unauthorized the user is not admin
 */
router.get("/:id", auth.isAdmin, getUser);

// Same as Sign Up
router.post("/", auth.isAdmin, createUser);

/**
 * @swagger
 *  /users/{id}:
 *    patch:
 *      summary: Update one or many fields of a User by ID
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of the user
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
 *                example: '{"name": "Anna"}'
 *      responses:
 *        200:
 *          description: The user has been succesfully updated.
 *        401:
 *          description: Unauthorized the user is not admin.
 */
router.patch("/:id", auth.isAdmin, updateUser);

/**
 * @swagger
 *  /users/{id}:
 *    delete:
 *      summary: Delete user by ID
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of the user
 *          schema:
 *              type: integer
 *              required: true
 *              example: 1
 *      responses:
 *        200:
 *          description: The user has been deleted.
 *        401:
 *          description: Unauthorized the user is not admin.
 */
router.delete("/:id", auth.isAdmin, deleteUser);

module.exports = router;
