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

// Obtener todos los productos - público
router.get('/products', productsController.getProducts);

// Obtener el detalle del producto por su ID - público
router.get('/products/:id', productIdValidation, handleValidationErrors, productsController.getProduct);

// Creación de producto - privado
router.post('/products', auth.checkAuthentication, productCreationValidation, handleValidationErrors, productsController.createProduct);

// Eliminar un producto por su ID - privado
router.delete('/products/:id', auth.checkAuthentication, productIdValidation, handleValidationErrors, productsController.deleteProduct);

export default router;