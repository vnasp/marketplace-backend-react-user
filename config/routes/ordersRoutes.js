import express from 'express';
import { auth } from "../../middlewares/auth.js";
import {ordersController} from '../../src/api/v1/controllers/ordersController.js';

const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Orders
 *    description: Orders API management
 *  security:
 *    BearerAuth: []
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
 *     OrderCreation:
 *       type: object
 *       required:
 *         - total_price
 *         - purchase_date
 *         - id_product
 *         - product_quantity
 *       properties:
 *         total_price:
 *           type: integer
 *           description: Total amount paid in Chilean Pesos (CLP) without decimal values
 *         purchase_date:
 *           type: string
 *           format: date-time
 *           description: Date of order placement
 *         id_product:
 *           type: integer
 *           description: Product ID purchased
 *         product_quantity:
 *           type: integer
 *           description: Quantity of the product purchased
 *       example:
 *         total_price: 10000
 *         purchase_date: "2023-01-01T00:00:00Z"
 *         id_product: 1
 *         product_quantity: 2
 *     OrderResponse:
 *       type: object
 *       required:
 *         - id_order
 *         - id_user
 *         - total_price
 *         - purchase_date
 *         - id_product
 *         - product_quantity
 *       properties:
 *         id_order:
 *           type: integer
 *           description: ID of order placement
 *         id_user:
 *           type: integer
 *           description: ID of user that place the order
 *         total_price:
 *           type: integer
 *           description: Total amount paid in Chilean Pesos (CLP) without decimal values
 *         purchase_date:
 *           type: string
 *           format: date-time
 *           description: Date of order placement
 *         id_product:
 *           type: integer
 *           description: Product ID purchased
 *         product_quantity:
 *           type: integer
 *           description: Quantity of the product purchased
 *       example:
 *         id_order: 1
 *         id_user: 2
 *         total_price: 10000
 *         purchase_date: "2023-01-01T00:00:00Z"
 *         id_product: 1
 *         product_quantity: 2
 *     OrderListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/OrderResponse'
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Order creation
 *     description: This endpoint facilitates the creation of new orders. The id_order is generated automatically and id_user is determined from the user's authentication token, for theses reasons aren't included in this schema.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/OrderCreation'
 *           example:
 *             total_price: 10000
 *             purchase_date: "2023-01-01T00:00:00Z"
 *             id_product: 1
 *             product_quantity: 2
 *     responses:
 *       '201':
 *         description: Success. The request has led to the creation of a new order.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/OrderResponse'
 *             example:
 *               id_order: 1
 *               id_user: 2
 *               total_price: 10000
 *               purchase_date: "2023-01-01T00:00:00Z"
 *               id_product: 1
 *               product_quantity: 2
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '409':
 *         description: Conflict. The request conflicts with the current state of the server, such as duplicate entries.
 */

router.post('/orders', auth.checkAuthentication, ordersController.createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get orders for the authenticated user
 *     description: Load all orders placed by the authenticated user. The user is identified through the authentication token.
 *     tags: [Orders]
 *     responses:
 *       '200':
 *         description: Success. The request has successfully loaded the orders for the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderListResponse'
 *             example:
 *               - id_order: 1
 *                 id_user: 2
 *                 total_price: 10000
 *                 purchase_date: "2023-01-01T00:00:00Z"
 *                 id_product: 1
 *                 product_quantity: 2
 *               - id_order: 2
 *                 id_user: 2
 *                 total_price: 10000
 *                 purchase_date: "2023-01-01T00:00:00Z"
 *                 id_product: 3
 *                 product_quantity: 3
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '404':
 *         description: Not Found. No orders were found for the user.
 */

router.get('/orders', auth.checkAuthentication, ordersController.getOrdersByAuthUser);


export default router;