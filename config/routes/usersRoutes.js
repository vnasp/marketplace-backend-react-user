import express from 'express';
import { auth } from "../../middlewares/auth.js";
import {usersController} from '../../src/api/v1/controllers/usersController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users API management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreation:
 *       type: object
 *       required:
 *         - email
 *         - firstname
 *         - lastname
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
 *        firstname: John
 *        lastname: Doe
 *        email: john.doe@test.com
 *        password: password
 *     UserResponse:
 *       type: object
 *       description: >-  Represents the user information that is safe to be exposed publicly. This schema is used for responses where user details are fetched without including sensitive data like passwords.
 *       properties:
 *         id_user:
 *           type: integer
 *           description: User's ID
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
 *         address:
 *           type: string
 *           description: User address
 *         phone:
 *           type: string
 *           description: User phone
 *         avatar_url:
 *           type: string
 *           description: User avatar
 *         sign_in_google:
 *           type: boolean
 *           description: User Login Status with Google
 *         date_add:
 *           type: string
 *           format: date-time
 *           description: User creation date
 *         date_upd:
 *           type: string
 *           format: date-time
 *           description: User update date
 *     UserEditable:
 *       type: object
 *       description: >-  Represents the user information that can be editable.
 *       properties:
 *         firstname:
 *           type: string
 *           description: User firstname
 *         lastname:
 *           type: string
 *           description: User lastname
 *         password:
 *           type: string
 *           minLength: 8
 *           description: User password, which must be at least 8 characters long and will be securely hashed before storage.
 *         address:
 *           type: string
 *           description: User address
 *         phone:
 *           type: string
 *           description: User phone
 *         avatar_url:
 *           type: string
 *           description: User avatar
 *         sign_in_google:
 *           type: boolean
 *           description: User Login Status with Google
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
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/UserResponse'
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '409':
 *         description: Conflict. The request conflicts with the current state of the server, such as duplicate entries.
 */

router.post('/users', usersController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get user information
 *     tags: [Users]
 *     parameters:
 *       - name: id
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
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '404':
 *         description: Not Found. The requested user could not be found in the system.
 */

router.get('/users/:id_user', auth.checkAuthentication, usersController.getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     summary: Update user information.
 *     description: Updates a user's information. Note: The `email` field cannot be updated via this operation.
 *     tags: [Users]
 *     parameters:
 *       - name: id
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
 *             $ref: '#/components/schemas/UserEditable'
 *           example:
 *             firstname: John
 *             lastname: Doe
 *             password: newpassword
 *             phone: 569123456789
 *             address: 123 Main St
 *             avatar_url: http://example.com/avatar.jpg
 *             sign_in_google: false
 *     responses:
 *       '200':
 *         description: Success. The request has successfully edited the user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '401':
 *         description: Unauthorized. The request lacks valid authentication credentials for the target resource.  
 *       '404':
 *         description: Not Found. The requested user could not be found in the system.
 */

router.put('/users/:id_user', auth.checkAuthentication, usersController.updateUser);

export default router;