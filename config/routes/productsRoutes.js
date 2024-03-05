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
    body('name').not().isEmpty().withMessage('The name is required'),
    body('price').isNumeric().withMessage('The price must be a number').isFloat({ min: 0.01 }).withMessage('The price must be greater than 0'),
    body('description').optional().isLength({ min: 0 }),
    body('image_url').isURL().withMessage('The image URL is not valid'),
    body('category').isIn(['Plantas', 'Manualidades', 'Música', 'Bienestar']).withMessage('The category is not valid'),
  ];
  
  // Validación para el ID del producto en la URL
  const productIdValidation = [
    param('id').isInt().withMessage('The product ID must be an integer')
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
// Creación de producto - privado
router.post('/products', auth.checkAuthentication, productCreationValidation, handleValidationErrors, productsController.createProduct);

// Obtener todos los productos - público
router.get('/products', productsController.getProducts);

// Obtener el detalle del producto por su ID - público
router.get('/products/:id', productIdValidation, handleValidationErrors, productsController.getProduct);

// Eliminar un producto por su ID - privado
router.delete('/products/:id', auth.checkAuthentication, productIdValidation, handleValidationErrors, productsController.deleteProduct);

export default router;