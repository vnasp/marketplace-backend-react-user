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
 *     Users:
 *       type: object
 *       required:
 *         - email
 *         - firstname
 *         - lastname
 *         - password
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
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
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
 *           type: string
 *           description: User Login Status with Google
 *         date_add:
 *           type: string
 *           description: User creation date
 *         date_upd:
 *           type: string
 *           description: User update date
 *
 *       example:
 *        id_user: 1,
 *        firstname: Amanda
 *        lastname: Fuentes
 *        email: amanda.fuentes@test.com
 *        password: 1234
 *        address: Avenida del Sol 1258
 *        phone: 56912345678
 *        avatar_url: https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg
 *        sign_in_google: false
 *        date_add: 2024-02-29T16:00:00.000Z
 *        date_upd: 2024-02-29T16:00:00.000Z
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
 *             type: object
 *             properties:
 *               user:
 *                 $ref: '#/components/schemas/Users'
 *     responses:
 *       '201':
 *         description: Success. The request has led to the creation of a new user.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/Users'
 *       '400':
 *         description: The request was invalid or can't be served due to bad syntax. Check the request format and parameters.
 *       '409':
 *         description: The request conflicts with the current state of the server, such as duplicate entries.
 */

router.post('/users', usersController.createUser);
router.get('/users', auth.checkAuthentication, usersController.getUser);

export default router;
