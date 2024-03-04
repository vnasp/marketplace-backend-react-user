import { Router } from "express";

// controller
import { favoritesController } from "../../src/api/v1/controllers/favoritesController.js";

// auth
import { auth } from "../../middlewares/auth.js";

/* Los chiquillos importan así, para que revisen y queden todos los routes iguales 
import express from 'express';
const router = express.Router();
*/

const router = Router();

router
    .route("/favorites/:id")
    .put(favoritesController.updateFavorites)
    .all((req, res, next) => {
        res.status(405).json({ message: "Method not allowed" });
    });

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorites API management
 * security:
 *   BearerAuth: []
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
 *     Favorites:
 *       type: object
 *       required:
 *         - id_product
 *       properties:
 *         id_product:
 *           type: integer
 *           description: Product ID marked as favorite
 *       example:
 *         id_product: 1
 *     FavoritesListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Favorites'
 */

/**
 * @swagger
 * /favorites:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Favorites creation
 *     description: This endpoint allows adding a product to the user's favorites. The user is identified through the authentication token, so id_user isn't needed in the request body.
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Favorites'
 *           example:
 *             id_product: 1
 *     responses:
 *       '201':
 *         description: Success. The product has been added to the user's favorites.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Favorites'
 *             example:
 *               id_product: 1
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '409':
 *         description: Conflict. The request conflicts with the current state of the server, such as duplicate entries.
 */

router.post('/favorites', auth.checkAuthentication, favoritesController.addFavorite);

/**
 * @swagger
 * /favorites:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get favorites for the authenticated user
 *     description: Load all favorites placed by the authenticated user. The user is identified through the authentication token.
 *     tags: [Favorites]
 *     responses:
 *       '200':
 *         description: Success. The request has successfully loaded the user's favorites.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoritesListResponse'
 *             example:
 *               - id_user: 1
 *                 id_product: 1
 *               - id_user: 1
 *                 id_product: 3
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '404':
 *         description: Not Found. No favorites were found for the user.
 */

router.get('/favorites', auth.checkAuthentication, favoritesController.getFavoritesByAuthUser);


export default router;
