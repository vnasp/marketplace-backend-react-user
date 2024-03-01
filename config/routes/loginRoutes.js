import express from 'express';
import {loginController} from '../../src/api/v1/controllers/loginController.js';

const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Login
 *    description: User authentication
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
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         password:
 *           type: string
 *           minLength: 8
 *           description: User password, which must be at least 8 characters long and will be securely hashed before storage.
 *       example:
 *         email: john.doe@test.com
 *         password: password
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User authentication
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Login'
 *           example:
 *             email: john.doe@test.com
 *             password: password
 *     responses:
 *       '200':
 *         description: Success. The request has led to the authentication of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token provided for user authentication.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '401':
 *         description: Unauthorized. The email or password is incorrect.
 */

router.post('/login', loginController.login);

export default router;
