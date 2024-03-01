import express from 'express';
import { auth } from "../../middlewares/auth.js";
import {usersController} from '../../src/api/v1/controllers/usersController.js';

const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: Users API management
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserCreation:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *       properties:
 *         firstname:
 *           type: string
 *           description: User firstname
 *         lastname:
 *           type: string
 *           description: User lastname
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         password:
 *           type: string
 *           minLength: 8
 *           description: User password, which must be at least 8 characters long and will be securely hashed before storage.
 *       example:
 *         firstname: John
 *         lastname: Doe
 *         email: john.doe@test.com
 *         password: password
 *     UserResponse:
 *       type: object
 *       description: Represents the user information that is safe to be exposed publicly. This schema is used for responses where user details are fetched without including sensitive data like passwords.
 *       properties:
 *         firstname:
 *           type: string
 *           description: User firstname
 *         lastname:
 *           type: string
 *           description: User lastname
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         phone:
 *           type: string
 *           description: User phone
 *         address:
 *           type: string
 *           description: User address
 *         avatar_url:
 *           type: string
 *           description: User avatar
 *         id_user_google:
 *           type: string
 *           description: ID provided by Google
 *         date_add:
 *           type: string
 *           format: date-time
 *           description: User creation date
 *         date_upd:
 *           type: string
 *           format: date-time
 *           description: User update date
 *       example:
 *         firstname: John
 *         lastname: Doe
 *         email: john.doe@test.com
 *         phone: 569123456789
 *         address: Calle Principal 123
 *         avatar_url: http://example.com/avatar.jpg
 *         date_add: "2023-01-01T00:00:00Z"
 *         date_upd: "2023-01-02T00:00:00Z"
 *     UserEdition:
 *       type: object
 *       description: Represents the user information that can be editable.
 *       properties:
 *         firstname:
 *           type: string
 *           minLength: 1
 *           description: User firstname. This field is required and can't be blank on an update.
 *         lastname:
 *           type: string
 *           minLength: 1
 *           description: User lastname. This field is required and can't be blank on an update.
 *         password:
 *           type: string
 *           minLength: 8
 *           description: User password, which must be at least 8 characters long and will be securely hashed before storage.
 *         address:
 *           type: string
 *           description: User address. Optional for updates.
 *         phone:
 *           type: string
 *           description: User phone. Optional for updates.
 *         avatar_url:
 *           type: string
 *           description: User avatar. Optional for updates.
 *       example:
 *         firstname: John
 *         lastname: Doe
 *         password: newSecurePassword123
 *         phone: 569123456789
 *         address: Calle Principal 567
 *         avatar_url: http://example.com/new-avatar.jpg
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: User creation
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserCreation'
 *           example:
 *             firstname: John
 *             lastname: Doe
 *             email: john.doe@test.com
 *             password: password
 *     responses:
 *       '201':
 *         description: Success. The request has led to the creation of a new user.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/UserResponse'
 *             example:
 *              firstname: John
 *              lastname: Doe
 *              email: john.doe@test.com
 *              phone: 569123456789
 *              address: Calle Principal 123
 *              avatar_url: http://example.com/avatar.jpg
 *              date_add: "2023-01-01T00:00:00Z"
 *              date_upd: "2023-01-02T00:00:00Z"
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '409':
 *         description: Conflict. The request conflicts with the current state of the server, such as duplicate entries.
 */

router.post('/users', usersController.createUser);

/**
 * @swagger
 * /users/{id_user}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get user information
 *     tags: [Users]
 *     parameters:
 *       - name: id_user
 *         in: path
 *         description: User id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Success. The request has successfully loaded the user information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               firstname: John
 *               lastname: Doe
 *               email: john.doe@test.com
 *               phone: 569123456789
 *               address: Calle Principal 123
 *               avatar_url: http://example.com/avatar.jpg
 *               date_add: "2023-01-01T00:00:00Z"
 *               date_upd: "2023-01-02T00:00:00Z"
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '404':
 *         description: Not Found. The requested user could not be found in the system.
 */

router.get('/users/:id_user', auth.checkAuthentication, usersController.getUser);

/**
 * @swagger
 * /users/{id_user}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     summary: Update user information.
 *     description: Updates a user's information.
 *     tags: [Users]
 *     parameters:
 *       - name: id_user
 *         in: path
 *         description: User id to be updated
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserEdition'
 *           example:
 *             firstname: John
 *             lastname: Doe
 *             password: newSecurePassword123
 *             phone: 569123456789
 *             address: Calle Principal 567
 *             avatar_url: "http://example.com/new-avatar.jpg"
 *     responses:
 *       '200':
 *         description: Success. The request has successfully edited the user information.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/UserResponse'
 *             example:
 *              firstname: John
 *              lastname: Doe
 *              phone: 569123456789
 *              address: Calle Principal 567
 *              avatar_url: http://example.com/new-avatar.jpg
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '401':
 *         description: Unauthorized. The request lacks valid authentication credentials for the target resource.  
 *       '404':
 *         description: Not Found. The requested user could not be found in the system.
 */

router.put('/users/:id_user', auth.checkAuthentication, usersController.editUser);

export default router;