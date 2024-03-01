import express from 'express';
import { body, param, validationResult } from 'express-validator';

// Controladores
import { productsController } from '../../src/api/v1/controllers/productsController.js';

// Middlewares
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

// VALIDACIONES

// Validaciones para la creación de productos
const productCreationValidation = [
    body('id_user').isInt().withMessage('ID del usuario debe ser un número entero'),
    body('name').not().isEmpty().withMessage('El nombre es requerido'),
    body('price').isNumeric().withMessage('El precio debe ser un número').isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor que 0'),
    body('description').optional().isLength({ min: 0 }),
    body('image_url').isURL().withMessage('La URL de la imagen no es válida'),
    body('category').isIn(['Plantas', 'Manualidades', 'Música', 'Bienestar']).withMessage('La categoría no es válida'),
  ];
  
  // Validación para el ID del producto en la URL
  const productIdValidation = [
    param('id').isInt().withMessage('El ID del producto debe ser un número entero')
  ];
  
  // Middleware para manejar los errores de validación
  const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

// RUTAS

/**
 * @swagger
 *  tags:
 *    name: Products
 *    description: Products API management
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
 *     Products:
 *       description: This schema represents products. For security reasons and to prevent misuse, updating products via PUT methods is not allowed. All products must be carefully managed through supported operations to ensure the integrity and reliability of the catalog.
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *         - image_url
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Product name
 *         price:
 *           type: integer
 *           description: Product price in Chilean Pesos (CLP) without decimal values.
 *         description:
 *           type: string
 *           description: Product description
 *         image_url:
 *           type: string
 *           description: Product image URL
 *         category:
 *           type: string
 *           description: Product category
 *           enum:
 *             - Plantas
 *             - Manualidades
 *             - Música
 *             - Bienestar
 *       example:
 *         name: Example Product
 *         price: 10000
 *         description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 *         image_url: http://example.com/product.jpg
 *         category: Manualidades
 */

/**
 * @swagger
 * /products:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Product creation
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Products'
 *           example:
 *            name: Example Product
 *            price: 10000
 *            description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 *            image_url: http://example.com/product.jpg
 *            category: Manualidades
 *     responses:
 *       '201':
 *         description: Success. The request has led to the creation of a new product.
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Products'
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '401':
 *         description: Unauthorized. The request don't achieve the security.
 */

// Creación de producto - privado
router.post('/products', auth.checkAuthentication, productCreationValidation, handleValidationErrors, productsController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products information
 *     description: Retrieves all products information. Filtering and sorting should be handled on the frontend, as this endpoint returns all products without support for backend filtering or sorting parameters.
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Success. The request has successfully loaded the product information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 *       '404':
 *          description: Not Found. The server can't find the requested resource like specified filter criteria or parameters match no products.
 *       '500':
 *         description: Internal Server Error. The server encountered an unexpected condition that prevented it from fulfilling the request.
 */

// Obtener todos los productos - público
router.get('/products', productsController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get specific product information
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Success. The request has successfully loaded the product information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax.
 *       '404':
 *         description: Not Found. The requested product could not be found in the system.
 */

// Obtener el detalle del producto por su ID - público
router.get('/products/:id', productIdValidation, handleValidationErrors, productsController.getProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     summary: Delete product.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product id to be deleted
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Success. The request has successfully deleted the product information.
 *       '400':
 *         description: Bad Request. The request was invalid or can't be served due to bad syntax like id invalid.
 *       '401':
 *         description: Unauthorized. The request lacks valid authentication credentials for the target resource.  
 *       '404':
 *         description: Not Found. The requested user could not be found in the system.
 */

// Eliminar un producto por su ID - privado
router.delete('/products/:id', auth.checkAuthentication, productIdValidation, handleValidationErrors, productsController.deleteProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Product update not allowed
 *     description: For security reasons and to prevent misuse, updating products via the PUT method is not allowed in this API.
 *     tags: [Products]
 */

export default router;